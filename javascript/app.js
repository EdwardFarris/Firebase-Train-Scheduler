// Initialize Firebase
var config = {
    apiKey: "AIzaSyBVeEOvxLMkRLSoGfeSCfZvz5SLwvLGVic",
    authDomain: "train-scheduler-bc413.firebaseapp.com",
    databaseURL: "https://train-scheduler-bc413.firebaseio.com",
    projectId: "train-scheduler-bc413",
    storageBucket: "train-scheduler-bc413.appspot.com",
    messagingSenderId: "420433429736"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
// Capture Button Click
$("#submitButton").on("click", function(event) {
  // Don't refresh the page!
  event.preventDefault();
  // YOUR TASK!!!
  trainName= $("#name").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#firstTrainTime").val().trim();
  frequency = $("#frequency").val().trim();
  
  // Code in the logic for storing and retrieving the most recent user.
  database.ref().push({
    name: trainName,
    destination: destination,
    trainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  $("#name").val('');
  $("#destination").val('');
  $("#firstTrainTime").val('');
  $("#frequency").val('');
});
  
// Don't forget to provide initial data to your Firebase database.
  database.ref().on("child_added", function(snapshot) {
      let sv = snapshot.val();
    
     // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(sv.trainTime, "HH:mm").subtract(1, "years");
    

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    

    // Time apart (remainder)
    var tRemainder = diffTime % sv.frequency;
  

    // Minute Until Train
    var tMinutesTillTrain = sv.frequency - tRemainder;
    

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    


    
  $("#trainTable").append("<tr><td>" + (sv.name) + "</td><td>" + (sv.destination) + "</td><td>" + (sv.frequency) + "</td><td>" + (nextTrain) + "</td><td>" + (tMinutesTillTrain));
  }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
  });

