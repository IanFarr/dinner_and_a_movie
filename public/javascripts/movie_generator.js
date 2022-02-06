document.addEventListener("DOMContentLoaded", () => {

  const button = document.querySelector("#generate_button");
  const movieTitleText = document.querySelector('#movie_title');
  const movieDescriptionText = document.querySelector('#movie_description');
  const moviePictureBox = document.querySelector('#movie_picture');

  button.addEventListener('click', () => {
    const streamSelections = document.querySelectorAll("#stream_service_selection input:checked");
    const genreSelections = document.querySelectorAll("#genre_selection input:checked");

    const stream = getRandomSelection(streamSelections);
    const genre = getRandomSelection(genreSelections);
    
    generateRandomMovie(stream, genre);
    generateRestaurants();
  });

  function getRandomSelection(selections) {
    const listLength = selections.length;
    const randomValue = Math.floor(Math.random() * listLength);
    randomSelection = selections[randomValue].value;
    return randomSelection;
  }

  async function generateRandomMovie(service, genre) {
    await axios.post('/api/movies', { service, genre }).then(function (response) {
      const result = response.data[0];
      const title = result.title;
      const description = result.overview;
      const picture = result.posterURLs.original;

      postInfo(title, description, picture);
    }).catch(function (error) {
      console.error(error);
    });
  }



  async function generateRestaurants() {
    console.log('clicked');
    await axios.post('/api/restaurants', {}).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.error(error);
    });
  }



  function postInfo(title, description, picture) {
    movieTitleText.innerHTML = title;
    movieDescriptionText.innerHTML = description;
    moviePictureBox.src = picture;
  }
});