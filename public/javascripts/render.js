document.addEventListener("DOMContentLoaded", () => {

  const generateButton = document.querySelector("#generate_button");
  const againButton = document.querySelector('#again_button')

  // input display query
  const inputDisplay = document.querySelector('#input_display');

  // movie div queries
  const movieDisplay = document.querySelector('#movie_display');
  const movieTitleText = document.querySelector('#movie_title');
  const movieDescriptionText = document.querySelector('#movie_description');
  const moviePictureBox = document.querySelector('#movie_picture');
  const movieStreamText = document.querySelector('#movie_stream');
  const movieDiv = document.querySelector('#movie_div');
  const againButtonDiv = document.querySelector('#again_button_div');


  // restaurant div queries
  const restaurantDisplay = document.querySelector('#restaurant_display');
  const restaurantNameText = document.querySelector('#restaurant_name');
  const restaurantCuisineText = document.querySelector('#restaurant_cuisine');
  const restaurantaddressText = document.querySelector('#restaurant_address');
  const restaurantPhoneText = document.querySelector('#restaurant_phone_number');
  const restaurantWebsiteText = document.querySelector('#restaurant_website');
  const restaurantDiv = document.querySelector('#restaurant_div');


  generateButton.addEventListener('click', async () => {
    const streamSelections = document.querySelectorAll("#stream_service_selection input:checked");
    const genreSelections = document.querySelectorAll("#genre_selection input:checked");

    const priceSelections = document.querySelectorAll("#price_selection input:checked");

    if (!streamSelections.length || !genreSelections.length || !priceSelections.length) {
      alert('Please select at least one of each criteria');
      return;
    }

    var locationPromise = getLocation();
    locationPromise
      .then(function (location) {
        generateRandomMovie(streamSelections, genreSelections, location, postMovieInfo);
        generateRandomRestaurant(priceSelections, location, postRestaurantInfo);
      })
      .catch(function (err) {
        generateRandomMovie(streamSelections, genreSelections, null, postMovieInfo);
        generateRandomRestaurant(priceSelections, null, noLocation);
      });


    function getLocation(callback) {
      var promise = new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((location) => {
            resolve(location);
          }
          );
        } else {
          reject(err)
        }
      });

      return promise;
    }
  });

  againButton.addEventListener('click', () => {
    hideDisplay();
  });

  function postMovieInfo(movie) {
    // update movie info
    movieTitleText.innerHTML = movie.title;
    movieDescriptionText.innerHTML = movie.description;
    moviePictureBox.src = movie.picture;
    movieStreamText.innerHTML = `Watch it on ${movie.service}`;
  }

  function postRestaurantInfo(restaurant) {
    // // update restaurant info
    restaurantNameText.innerHTML = restaurant.name;
    restaurantCuisineText.innerHTML = `Cuisine: ${restaurant.cuisine}`;
    restaurantaddressText.innerHTML = `Address: ${restaurant.street}, ${restaurant.city}`;
    restaurantPhoneText.innerHTML = `Phone: ${restaurant.phoneNumber}`;
    restaurantWebsiteText.href = restaurant.website;

    revealDisplay();
  }

  function revealDisplay() {
    movieDisplay.removeAttribute('hidden')
    restaurantDisplay.removeAttribute('hidden')
    againButton.removeAttribute('hidden')

    movieDiv.removeAttribute('hidden')
    restaurantDiv.removeAttribute('hidden')
    againButtonDiv.removeAttribute('hidden')

    inputDisplay.hidden = true;
  }

  function hideDisplay() {
    movieDisplay.hidden = true
    restaurantDisplay.hidden = true
    againButton.hidden = true

    movieDiv.hidden = true
    restaurantDiv.hidden = true
    againButtonDiv.hidden = true

    inputDisplay.hidden = false;
  }

  function noLocation() {
    revealDisplay();
    alert('location is required to display a nearby restaurant');
  }

});