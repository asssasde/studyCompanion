
console.log("hello");
require.config({
  paths: {
    "jquery": "https://code.jquery.com/jquery-2.2.4.min", 
    "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment",
    "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.bundle"
  },
  shim: {
        jquery: {
            exports: "$"
    }
  }
});

require(['jquery', 'moment', 'chartjs'], function($ ,moment, Chart) {
  
    const CHART = document.getElementById("myChart");

    Chart.defaults.scale.ticks.beginAtZero = true;

    let barChart = new Chart(CHART,{
    
        type: 'bar',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
            datasets: [{
                label: 'Hours Per Week',
                backgroundColor: '#b2c7c8',
                data: [10, 15, 23, 30, 21, 33, 12, 28, 11]
            }]
        }

    });


// Google map api with traffic layer

function initMap () {
    var umBootcamp = { lat: 25.7229869, lng: -80.278534 };
    var map = new google.maps.Map(document.getElementById('trafficSection'), {
        zoom: 4,
        center: umBootcamp,
      });
     
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


