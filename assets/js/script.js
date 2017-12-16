
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




  
});


