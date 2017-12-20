
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDAQEQ-Kv0IOWzZRPFOdp2tuG14h6rEirE",
    authDomain: "studybuddy-dfa34.firebaseapp.com",
    databaseURL: "https://studybuddy-dfa34.firebaseio.com",
    projectId: "studybuddy-dfa34",
    storageBucket: "",
    messagingSenderId: "585854569143"
  };
  firebase.initializeApp(config);

 var database = firebase.database()

//Require
require.config({

  paths: {
    //"jquery": "https://code.jquery.com/jquery-2.2.4.min",
    "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment",
    "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.bundle"
  },
  shim: {
    //     jquery: {
    //         exports: "$"
    // }
  }
});

//TIMER
var time = document.getElementById('timer');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var stop = document.getElementById('stop');
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
var addedSeconds = 0, addedMinutes = 0, addedHours = 0, addedTime = 10.1;


function add()
{
    seconds++;
    if (seconds >= 60)
    {
        seconds = 0;
        minutes++;
        if (minutes >= 60)
        {
            minutes = 0;
            hours++;
        }
    }

    time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer()
{
      t = setTimeout(add, 1000);
}


$("#start").on("click", function() {
        event.preventDefault();
        $("#start").empty().append("start");
        clearTimeout(t);
        timer();
        console.log("start");
    });

$("#pause").on("click", function(){
    clearTimeout(t);
    $("#start").empty().append("start");
});

$("#stop").on("click", function() {

    console.log("seconds: " + seconds + "minutes:" + minutes + "hours:" + hours);
    saveToDb(hours, minutes, seconds);
    


    //console.log("stop");
    $("#start").empty().append("start");

    clearInterval(t);
    time.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;


 });
//END OF TIMER

function saveToDb(hours, minutes, seconds) {
  var saveTime = {
      hour: hours,
      minute: minutes,
      seconds: seconds
  }
    database.ref("/time").push(saveTime);
}
var weeks = [];

function sum(hrs, mins, secs){
addedTime = hrs + (mins / 60) + (secs);
//console.log(addedTime);
return addedTime;
}
database.ref("/time").on("child_added", function(snapshot){
  //console.log(snapshot.val());
  addedHours += parseInt(snapshot.val().hour);
  addedSeconds += parseInt(snapshot.val().seconds);
  addedMinutes += parseInt(snapshot.val().minute);
  //console.log(addedSeconds);
  console.log(sum(addedHours,addedMinutes, addedSeconds));
  
})


//END OF TIMER

// CHART
//addedTime = parseInt(addedHours) + parseInt(addedMinutes / 60) + parseInt(addedSeconds / 3600);
require(['moment', 'chartjs'], function(moment, Chart) {

    const CHART = document.getElementById("myChart");

    Chart.defaults.scale.ticks.beginAtZero = true;

    let barChart = new Chart(CHART,{

        type: 'bar',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
            datasets: [{
                label: 'Hours Per Week',
                backgroundColor: '#b2c7c8',
                data: [10, 15, 23, 30, 21, 33, 12, 28, 11, sum(addedHours,addedMinutes,addedSeconds)]

            }]
        }
  
    });
    //console.log(barChart.data.datasets[0].data[9]);
    //var weekTen = barChart.data.datasets[0].data;
    console.log(addedTime);

//END OF CHART


// Random Quotes Starts Here

quote();

function quote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "en",
      format: "jsonp"
    },
    success: function(response) {
      $('#quote').html(response.quoteText)
      $('#author').html(response.quoteAuthor)
    }
  });
}

$("#quoteButton").on("click", function() {
  quote();
});

// Random quotes Ends Here


// Google map api init. Location default is UM Bootcamp location - Allen Hall

function initMap () {
    var umBootcamp = { lat: 25.7229869, lng: -80.278534 };
    var map = new google.maps.Map(document.getElementById('trafficSection'), {
        zoom: 4,
        center: umBootcamp,
      });
     //grabs user location via dialogue on browser.
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
           const user_location = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };

           // Center map with user location
           map.setCenter(user_location);

           // Add a marker for your user location
           var userLocation = new google.maps.Marker({
             position: {
               lat: user_location.lat,
               lng: user_location.lng
             },
             map: map,
             title: "You are here"
           });

     var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();

     var directionRequest = {
       origin: user_location,
       destination: umBootcamp,
       travelMode: 'DRIVING'
     };

     directionsService.route(
       directionRequest,
       function(response, status) {
         if (status === 'OK') {
           // everything is ok
           directionsDisplay.setDirections(response);

         } else {
           // something went wrong
           window.alert('Directions request failed due to ' + status);
         }
       }
     );


     directionsDisplay.setMap(map);

     console.log(directionsDisplay);

     }, function () {
       console.log('Error in the geolocation service.');
     });
     } else {
     console.log('Browser does not support geolocation.');
     }

     }

     initMap();

});
// END OF MAP

