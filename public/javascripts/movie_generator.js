function generateRandomMovie(streamSelections, genreSelections, location, postMovieInfo) {
  const selections = getRandomSelection(streamSelections, genreSelections);
  getNumPages(selections, postMovieInfo)
  // callMovieApi(selections, page, postMovieInfo);
}

function getRandomSelection(streamSelections, genreSelections) {
  const streamListLength = streamSelections.length;
  service = streamSelections[Math.floor(Math.random() * streamListLength)].value;
  const genreListLength = genreSelections.length;
  genre = genreSelections[Math.floor(Math.random() * genreListLength)].value;
  return { service, genre };
}

async function getNumPages(selections, postMovieInfo) {
  await axios.post('/api/movies', { "service": selections.service, "genre": selections.genre, "page": 2 }).then(function (response) {
    const result = response;

    let numPages =  response.data.total_pages;
    let page = Math.floor(Math.random() * numPages)
    callMovieApi(selections, page, postMovieInfo);
  }).catch(function (error) {
    console.error(error);
  });
}

async function callMovieApi(selections, page, postMovieInfo) {
  await axios.post('/api/movies', { "service": selections.service, "genre": selections.genre, "page": page }).then(function (response) {
    const result = response.data.results[Math.floor(Math.random() * response.data.results.length)];
    const title = result.title;
    const description = result.overview;
    const picture = result.posterURLs.original;
    const service = selections.service;
    postMovieInfo({ title, description, picture, service })
  }).catch(function (error) {
    console.error(error);
  });
}
