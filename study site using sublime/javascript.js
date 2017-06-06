var images = ['v1496524677/davide-cantelli-153517_zsaoca.jpg', 'v1496524678/john-towner-126924_nswbbj.jpg', 'v1494209220/tim-gouw-60216_myxgnq.jpg', 'v1494209560/alex-robert-133574_ppyifv.jpg', 'v1494391384/tim-gouw-167127_fms8jb.jpg', 'v1494391781/blake-wisz-85030small_ztqzpt.jpg', 'v1494391770/bonnie-kittle-186235small_ffkvpr.jpg']; // 'images' variable holds an array of image names that will be used for the background images

$('.header-image').css({ // this works with the 'images' array above, which allows background images to be displayed at random served from the contained url. Each element in the 'images' array above is the second half of the full image url and both haves are combined here.
  'background-image': 'url("http://res.cloudinary.com/djqeszs2b/image/upload/' + images[Math.floor(Math.random() * images.length)] + '")'
});


function getInfo() { // this 'getInfo' function is what grabs all the content from "Four Square" API, styles it, and then displays it.

    document.getElementById('results').innerHTML = ""; // empties the 'results' id div of all content before each search.
    document.getElementById('results').style.backgroundColor = "#fff"; // styles background color in 'results' div to white before each search.
    document.getElementById('results').style.padding = "20px 0 20px 0"; // styles padding in 'results' div before each search.

    var searchCity = document.getElementById("theBar").value; // this variable contains the search bar value entered.

    var objectUrl = "https://api.foursquare.com/v2/venues/explore?v=20170324&near=" + searchCity + "&query=study%20spot&limit=10&intent=browse&radius=100000&venuePhotos=1&client_id=XPQI2RJB3NMDT2JYQIMWDMGZSKRDQZX40NYIOKK02DXB1CVE&client_secret=UNHLLMUWXTEI3USTTN5DRJ02QDWQMHZQ5B22CFX0EY4JLEHO"; // this variable contains the full FourSquare API url that retuns an object containing search results

    window.fetch(objectUrl) // fetches the url API contained in the objectUrl variable

    // Error handling --------------------------------------
    .then(data => data.json()) // parses the object data returned from the FourSquare API url, so that if a '400 Bad Request' error is returned, the object data is accessible.
      .then(data => {
        if (data.meta.code === 400) { // if there is a '400 Bad Request' code returned then return the error handling text.
          return document.getElementById('results').innerHTML += "City entered was not found. Please check spelling and enter again.";
        } else if (!isNaN(searchCity)) {
          return document.getElementById('results').innerHTML += "You have entered a number. Please enter a city name.";
          // End of error handling code ---------------------
        } else { // 'else', if there are no errors, execute the code below.

          // Capitalizes first letter of each city entered into search bar --------------------
          var searchCityCap = searchCity.split(" ");
          for (var k = 0; k < searchCityCap.length; k++) {
            searchCityCap[k] = searchCityCap[k].replace(searchCityCap[k][0], searchCityCap[k][0].toUpperCase());
          }
          searchCityCap = searchCityCap.join(" ");
          // ----------------------------------------------------------

          var photos = data.response.groups[0].items; // this variable represents each venue listing in the retrieved object. Knowing the total number of these venue listings through "photos.length" I am able to loop through each listing item in the 'for loop' below.
          
          var j = 1; // variable for the displayed number count to the left of venue name output
          document.getElementById('results').innerHTML += "<h3>Search Results for " + searchCityCap + "</h3><br>";
          for (var i = 0; i < photos.length; i++) { // loops through each venue listing in object and extracts the venues preview photo as well as address & contact info.

            if (data.response.groups[0].items[i].venue.photos.count !== 0) { //Not all venues have photos. If there is not a photo the 'for loop' will error and stop. This conditional says if photos exist, do the below code, if no photos exist do the 'else' code.

              // the below code places specific venue listing info from the API object into the 'results' div and styles it.
              document.getElementById('results').innerHTML += "<img src='" + data.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix + "300x300" + data.response.groups[0].items[i].venue.photos.groups[0].items[0].suffix + "'>" + "<br><br>" +
                "<strong>" + j++ +". </strong>" + data.response.groups[0].items[i].venue.name + " - " + data.response.groups[0].items[i].venue.categories[0].name + "<br>" +
                "<strong>Phone. </strong>" + data.response.groups[0].items[i].venue.contact.formattedPhone + "<br>" +
                "<strong>Address. </strong>" + data.response.groups[0].items[i].venue.location.formattedAddress + "<br>" +
                "<a href='http://www.google.com/maps/place/" + data.response.groups[0].items[i].venue.location.address + "+" + data.response.groups[0].items[i].venue.location.postalCode + "' target='_blank'>Google Map</a>" +
                "<br><br><br>";
            } else { // the below code extracts only the direction and address info if a photo does not exist.
              document.getElementById('results').style.backgroundColor = "#fff";
              document.getElementById('results').style.padding = "20px 0 20px 0";
              document.getElementById('results').innerHTML += "<img src='http://res.cloudinary.com/djqeszs2b/image/upload/v1494782267/no_image_available_gduyp5.jpg' alt='' style='width:300px;height:px;'><br>" +
                "<strong>" + j++ +". </strong>" + data.response.groups[0].items[i].venue.name + " - " + data.response.groups[0].items[i].venue.categories[0].name + "<br>" +
                "<strong>Phone. </strong>" + data.response.groups[0].items[i].venue.contact.formattedPhone + "<br>" +
                "<strong>Address. </strong>" + data.response.groups[0].items[i].venue.location.formattedAddress + "<br>" +
                "<a href='http://www.google.com/maps/place/" + data.response.groups[0].items[i].venue.location.address + "+" + data.response.groups[0].items[i].venue.location.postalCode + "' target='_blank'>Google Map</a>" +
                "<br><br><br>";
            } // end of "if/else" conditional statement

          } // end of for loop

        }
      }); // End of Window.fetch function


  } // end of getInfo function

document.getElementById('theBtn').onclick = function(e) { // "click" search button fucntion, which runs "getInfo()" that pulls in data from object
  e.preventDefault();

  getInfo();

}; // end of 'onclick' document.getElement function