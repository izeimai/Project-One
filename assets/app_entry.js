// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1nyE-SfenxVwBoxuoL92zFCEsZb0GUqo",
  authDomain: "studybuddy-bc331.firebaseapp.com",
  databaseURL: "https://studybuddy-bc331.firebaseio.com",
  projectId: "studybuddy-bc331",
  storageBucket: "studybuddy-bc331.appspot.com",
  messagingSenderId: "21013901811"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var street = "";
var city = "";
var state = "";
var zip = "";
var hours = "";

// Capture Button Click
$("#enterform").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name").val().trim();
  street = $("#street_address").val().trim();
  street = street.replace(/\s+/g, '+');  // this regex replaces spaces with + marks e.g. 3000+Market+St
  city = $("#city_address").val().trim();
  state = $("#state_address").val().trim();
  state = state[1] + state[2]; // just need the two letter acronym e.g. PA from the state address field
  console.log("This is the state address before storing: " + state);
  zip = $("#zip_code_address").val().trim();
  hours = $("#hoursAvailable").val().trim();


  // Clear local storage and store the address to local storage
  localStorage.clear();
  localStorage.setItem("name", name);
  localStorage.setItem("street", street);
  localStorage.setItem("city", city);
  localStorage.setItem("state", state);
  localStorage.setItem("zip", zip);

  // Ajax code to geocod.io to convert text address to latitude and longitude
  var queryURL2 = "https://api.geocod.io/v1.3/geocode?street=" + street + "&city=" + city + "&state=" + state + "&api_key=6446f59bc5ec449c45ce44c9c4466c5f61816e1";

  console.log(queryURL2);

  var tempCoordinates = [];

  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    //Storing latitude and longitude
    var lat = response.results[0].location.lat; // stores latitude
    var lng = response.results[0].location.lng; // stores longitude
    tempCoordinates = [lat, lng];
    
    console.log(tempCoordinates);

    // Code for handling the push
    database.ref("users").push({
      name: name,
      street: street,
      city: city,
      state: state,
      zip: zip,
      coordinates: tempCoordinates,
      hours: hours,
      infoAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });


});

// Firebase watcher .on("child_added"
database.ref("users").on("child_added", function (snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv);
  console.log(sv.street);
  console.log(sv.city);
  console.log(sv.state);
  console.log(sv.zip);
  console.log(sv.hours);

  // Change the HTML to reflect
  // $("#name-display").text(sv.name);
  // $("#email-display").text(sv.email);
  // $("#age-display").text(sv.age);
  // $("#comment-display").text(sv.comment);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});




// $(document).ready(function() {

    //clearing out the time in the time once the time limit has been met the database

    //this is what will make the timer go down when the user clicks it which will start the timer from the submit button from the front screen

    //This is what will happen when the user pushes the button and page/timer for what user put in for time will start to count down
//     $("#start").on("click", function() {
//         $("start").hide();
//         start(i=0);
//     })

//     //Timer on the page that will start going down but will be hidden in backgroudn
//     function run() {
//         intervalId = setInterval(decrement, 1000);
//     }

//     function decrement() {
//         number--;
//         console.log(run);


//     }

// })