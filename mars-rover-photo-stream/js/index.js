var previousDayMs = new Date().getTime() - 86400000; // previous day in milliseconds 86400000 = 1 Day
var ymdDateFormat = new Date(previousDayMs).toISOString(); // Year Month Day format 2014-08-05T19:42:51.429Z
var searchDate = ymdDateFormat.substr(0, 10); // Year Month and Day only. 2014-08-05

var previous2DayMs = new Date().getTime() - 176400000; // previous day in milliseconds 86400000 = 1 Day
var ymdDate2Format = new Date(previous2DayMs).toISOString(); // Year Month Day format 2014-08-05T19:42:51.429Z
var search2Date = ymdDate2Format.substr(0, 10); // Year Month and Day only. 2014-08-05

var oldMiliSpirit = new Date().getTime() - 216905600000; // previous day in milliseconds 86400000 = 1 Day
var ymdDateSpirit = new Date(oldMiliSpirit).toISOString(); // Year Month Day format 2014-08-05T19:42:51.429Z
var searchSpirit = ymdDateSpirit.substr(0, 10); // Year Month and Day only. 2014-08-05

$(document).ready(function() {
  switchRover("curiosity", searchDate); // pulls in images of Curiousity rover for Home page
  document.getElementById('dateRange').innerHTML = "<br>2012-08-08 to " + searchDate;
  document.getElementById('searchBtn').onclick = function(e) { // sets up home page search box to search Curiosity rover
    e.preventDefault();
    searchDateByRover("curiosity");
  }

  //         //       function imgWidth() {
  //         //         var img = new Image();
  //         //         img.onload = function() {
  //         //           this.width;
  //         //           return this;
  //         //         }
  //         //         img.src = data.photos[i].img_src;
  //         //       }

  function switchRover(roverName, earthDate) { // function that clears array & div of old images and html and inserts new html and images into page for the rover that is selected from top of the html page
    siteImages = [];
    document.getElementById("gallery").innerHTML = "";
    $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverName + "/photos?earth_date=" + earthDate + "&api_key=hO7EyKsud04wDyzzRAr2EKchRLhvycBlbh9lngBp", function(data) {

      for (var i = 0; i < data.photos.length; i++) {
        if (siteImages.indexOf(data.photos[i].img_src) === -1) { // check if image is in array
          siteImages.unshift(data.photos[i].img_src); // add image to front of array if not in array already
        } // end if loop
      } // end for loop

      for (var y = 0; y < siteImages.length; y++) {
        document.getElementById('gallery').innerHTML += "<img src='" + siteImages[y] + "' width='900' class='img-responsive center-block'>" + "<h5>" + " " + data.photos[y].camera.full_name + "</h5><h4>Date: " + data.photos[y].earth_date + "</h4><br><br>";
      }
    }); // end getJSON and inner function
  }; // end switchRover function

  function searchDateByRover(roverName) { // function that sets up search bar for rover that is selected from top of the html page. Also clears array & div of old images and html and inserts new html and images into page for the selected rover
    siteImages = [];
    document.getElementById("gallery").innerHTML = "";
    var searchVal = document.getElementById("searchBar").value;

    $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverName + "/photos?earth_date=" + searchVal + "&api_key=hO7EyKsud04wDyzzRAr2EKchRLhvycBlbh9lngBp", function(data) { 

      for (var i = 0; i < data.photos.length; i++) {

        if (siteImages.indexOf(data.photos[i].img_src) === -1) { // check if image is in array
          siteImages.unshift(data.photos[i].img_src); // add image to front of array if not in array already
        } // end if loop
      } // end for loop

      for (var y = 0; y < siteImages.length; y++) {
        document.getElementById('gallery').innerHTML += "<img src='" + siteImages[y] + "' width='900' class='img-responsive center-block'>" + "<h5>" + " " + data.photos[y].camera.full_name + "</h5><h4>Date: " + data.photos[y].earth_date + "</h4><br><br>";
      }
    }) // end getJSON and inner function
    .fail(function() { 
      roverHeading.innerHTML = "Images are not available for the date entered<br><br>Or<br><br>Date format is incorrect<br>Use this format:<br>YYYY-MM-DD<br><h4>Y = Year,  M = Month,  D = Day</h4>";
    })
 
  }; // end searchDateByRover function 
  

  
  document.getElementById("curiosity").onclick = function(e) { // Loads latest images and enables image search by date for Curiosity rover
      e.preventDefault();
      document.getElementById('roverHeading').innerHTML = "Curiosity";
      document.getElementById('dateRange').innerHTML = "<br>2012-08-08 to " + searchDate;
      switchRover("curiosity", searchDate);
      document.getElementById('searchBtn').onclick = function(e) {
        e.preventDefault();
        searchDateByRover("curiosity");
      }
    } // end of 'onclick' document.getElement function

  document.getElementById("opportunity").onclick = function(e) { // Loads latest images and enables image search by date for Opportunity rover
      e.preventDefault();
      document.getElementById('roverHeading').innerHTML = "Opportunity";
      document.getElementById('dateRange').innerHTML = "<br>2004-01-26 to " + searchDate;
      switchRover("opportunity", searchDate);
      document.getElementById('searchBtn').onclick = function(e) {
        e.preventDefault();
        searchDateByRover("opportunity");
      }
    } // end of 'onclick' document.getElement function

  document.getElementById("spirit").onclick = function(e) { // Loads latest images and enables image search by date for Spirit rover
      e.preventDefault();
      document.getElementById('roverHeading').innerHTML = "Spirit";
      document.getElementById('dateRange').innerHTML = "<br>2004-01-05 to 2010-02-26";
      switchRover("spirit", "2010-02-26"); // Loads the last date images were available from this rover
      document.getElementById('searchBtn').onclick = function(e) {
        e.preventDefault();
        searchDateByRover("spirit");
      }
    } // end of 'onclick' document.getElement function

  document.getElementById("backToTopBtn").onclick = function() { // creates 'back to top button'
    $('html,body').animate({
      scrollTop: 0
    }, 'slow');
    return false;
  }
}); // end document.ready