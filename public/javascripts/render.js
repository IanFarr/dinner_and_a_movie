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


  // restaurant div queries
  const restaurantDisplay = document.querySelector('#restaurant_display');
  const restaurantNameText = document.querySelector('#restaurant_name');
  const restaurantCuisineText = document.querySelector('#restaurant_cuisine');
  const restaurantaddressText = document.querySelector('#restaurant_address');
  const restaurantPhoneText = document.querySelector('#restaurant_phone_number');
  const restaurantWebsiteText = document.querySelector('#restaurant_website');
  const restaurantPriceText = document.querySelector('#restaurant_price_level');
  const restaurantPictureBox = document.querySelector('#restaurant_picture');



  generateButton.addEventListener('click', () => {
    const streamSelections = document.querySelectorAll("#stream_service_selection input:checked");
    const genreSelections = document.querySelectorAll("#genre_selection input:checked");

    const priceSelections = document.querySelectorAll("#price_selection input:checked");

    generateRandomMovie(streamSelections, genreSelections, postMovieInfo);
    generateRandomRestaurant(priceSelections, postRestaurantInfo);
  });

  againButton.addEventListener('click', () => {
    hideDisplay();
  });

  function postMovieInfo(movie) {
    // update movie info
    movieTitleText.innerHTML = movie.title;
    movieDescriptionText.innerHTML = movie.description;
    moviePictureBox.src = movie.picture;
    movieStreamText.innerHTML = `watch it on ${movie.service}`;
  }

  function postRestaurantInfo(restaurant) {
    // // update restaurant info
    restaurantNameText.innerHTML = restaurant.name;
    restaurantCuisineText.innerHTML = "test";
    restaurantaddressText.innerHTML = restaurant.address;
    restaurantPhoneText.innerHTML = restaurant.phoneNumber;
    restaurantWebsiteText.innerHTML = restaurant.website;
    restaurantPriceText.innerHTML = restaurant.price;
    // restaurantPictureBox.src = restaurant.picture;

    revealDisplay();
  }

  function revealDisplay() {
    movieDisplay.removeAttribute('hidden')
    restaurantDisplay.removeAttribute('hidden')
    againButton.removeAttribute('hidden')

    inputDisplay.hidden = true;
  }

  function hideDisplay() {
    movieDisplay.hidden = true
    restaurantDisplay.hidden = true
    againButton.hidden = true

    inputDisplay.hidden = false;
  }

});