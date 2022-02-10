async function generateRandomMovie(streamSelections, genreSelections, location, postMovieInfo, revealLanding, hideLoader) {
  const selections = getRandomSelection(streamSelections, genreSelections);
  getNumPages(selections, postMovieInfo, revealLanding, hideLoader);
}

function getRandomSelection(streamSelections, genreSelections) {
  const streamListLength = streamSelections.length;
  const genreListLength = genreSelections.length;

  service = streamSelections[Math.floor(Math.random() * streamListLength)].value;
  genre = genreSelections[Math.floor(Math.random() * genreListLength)].value;

  return { service, genre };
}

async function getNumPages(selections, postMovieInfo, revealLanding, hideLoader) {
  await axios.post('/api/movies', { "service": selections.service, "genre": selections.genre, "page": '1' }).then(function (response) {
    let numPages = response.data.total_pages;
    let page = Math.floor(Math.random() * numPages)
    selections.page = String(page);
    callMovieApi(selections, postMovieInfo, revealLanding, hideLoader);
  }).catch(function (error) {
    hideLoader();
    revealLanding();
    console.error(error);
  });
}

async function callMovieApi(selections, postMovieInfo, revealLanding, hideLoader) {
  axios.post('/api/movies', { 
    "service": selections.service, "genre": selections.genre, "page": selections.page 
  }).then(function (response) {
    const result = response.data.results[Math.floor(Math.random() * response.data.results.length)];
    const title = result.title;
    const description = result.overview;
    const picture = result.posterURLs.original;
    const service = serviceName(selections.service);
    postMovieInfo({ title, description, picture, service })
  }).catch(function (error) {
    hideLoader();
    revealLanding();
    console.error(error);
  });
}

function serviceName(short) {
  return short === 'netflix' ? 'Netflix' : short === 'prime' ? 'Amazon Prime' : short === 'hbo' ? 'HBO Max' : short === 'hulu' ? 'Hulu' : 'Disney+';
}
