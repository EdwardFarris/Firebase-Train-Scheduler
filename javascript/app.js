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
    frequency: frequency
  });
  // Don't forget to provide initial data to your Firebase database.
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);
    
    var now = moment(new Date());
    var tFrequency = 3;

    // Time is 3:00 AM
    var firstTime = "03:00";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    
    // var end = moment(snapshot.val().date);
    // var duration = moment.duration(now.diff(end));
    // var days = duration.asMonths();
    // daysRound = Math.floor(days);
    // var totalBilled = daysRound * snapshot.val().rate;
  $("#trainTable").append("<tr><td>" + (snapshot.val().name) + "</td><td>" + (snapshot.val().destination) + "</td><td>" + (snapshot.val().trainTime) + (snapshot.val().frequency));
  }, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
  });
});
// Firebase watcher + initial loader HINT: .on("value")