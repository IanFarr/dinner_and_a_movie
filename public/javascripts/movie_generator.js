function generateRandomMovie(streamSelections, genreSelections, postMovieInfo) {
  const selections = getRandomSelection(streamSelections, genreSelections);
  callMovieApi(selections, postMovieInfo);
}

function getRandomSelection(streamSelections, genreSelections) {
  const streamListLength = streamSelections.length;
  service = streamSelections[Math.floor(Math.random() * streamListLength)].value;
  const genreListLength = genreSelections.length;
  genre = genreSelections[Math.floor(Math.random() * genreListLength)].value;
  return { service, genre };
}

async function callMovieApi(selections, postMovieInfo) {
  console.log(selections)
  await axios.post('/api/movies', { "service": selections.service, "genre": selections.genre }).then(function (response) {
    const result = response.data[Math.floor(Math.random() * response.data.length)];
    const title = result.title;
    const description = result.overview;
    const picture = result.posterURLs.original;
    const service = selections.service;
    postMovieInfo({ title, description, picture, service })
  }).catch(function (error) {
    console.error(error);
  });
}
