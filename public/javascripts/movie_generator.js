document.addEventListener("DOMContentLoaded", () => {

  let button = document.querySelector("#generate_button button");
  let movieTitleText = document.querySelector('#movie_title');
  let movieDescriptionText = document.querySelector('#movie_description');
  let moviePictureBox = document.querySelector('#movie_picture');

  button.addEventListener('click', () => {
    const streamSelections = document.querySelectorAll("#stream_service_selection input:checked");
    const genreSelections = document.querySelectorAll("#genre_selection input:checked");

    const stream = getRandomSelection(streamSelections);
    const genre = getRandomSelection(genreSelections);
    
    generateRandomMovie(stream, genre);
  });

  function getRandomSelection(selections) {
    const listLength = selections.length;
    const randomValue = Math.floor(Math.random() * listLength);
    randomSelection = selections[randomValue].value;
    return randomSelection;
  }

  async function generateRandomMovie(stream, genre) {
    var options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/basic',
      params: {
        country: 'us',
        service: stream,
        type: 'movie',
        genre: genre,
        page: `1`,
        output_language: 'en',
        language: 'en'
      },
      headers: {
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        'x-rapidapi-key': STREAMING_AVAILABILITY_API_KEY
      }
    };

    await axios.request(options).then(function (response) {
      const result = response.data.results[0];
      const title = result.title;
      const description = result.overview;
      const picture = result.posterURLs.original;

      postInfo(title, description, picture);
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