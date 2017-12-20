//Require
require.config({

  paths: {
    //"jquery": "https://code.jquery.com/jquery-2.2.4.min",
    "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment",
    "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.bundle"
  },
  shim: {

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
    //console.log("stop");
    $("#start").empty().append("start");
    clearInterval(t);
    time.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
 });
//END OF TIMER


// CHART
require(['moment', 'chartjs'], function(moment, Chart) {

    const CHART = document.getElementById("myChart");

    Chart.defaults.scale.ticks.beginAtZero = true;

    let barChart = new Chart(CHART,{

        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Hours Per Day',
                backgroundColor: '#b2c7c8',
                data: [2, 34, 4, 2, 1, 4, 0.5,]
            }]
        }

    });
//END OF CHART


// Random Quotes Starts Here

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
      $('#author').html("<br/>&dash; " + response.quoteAuthor)

    }
  });
}

$("#quoteButton").on("click", function() {

  quote();
});

// Random quotes Ends Here


// Google map api init. Location default is UM Bootcamp location - Allen Hall
function initMap () {
    var umBootcamp = { lat: 25.7230, lng: -80.2763 };
    var map = new google.maps.Map(document.getElementById('trafficSection'), {
        zoom: 14,
        center: umBootcamp,
      });

      //traffic layer functionality.
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

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
