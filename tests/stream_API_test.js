var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/search/basic',
  params: {
    country: 'us',
    service: 'netflix',
    type: 'movie',
    genre: '12',
    page: '1',
    output_language: 'en',
    language: 'en'
  },
  headers: {
    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
    'x-rapidapi-key': '9a23aa3a4cmshb5e1031f9b08eb6p1e6b01jsn2e358cb79bfa'
  }
};

let result = null;

axios.request(options).then(function (response) {
  const result = response.data.results[0];
  printInfo(result);
}).catch(function (error) {
  console.error(error);
});

function printInfo(result) {
  const title = result.title;
  const description = result.overview;
  const poster = result.posterURLs.original;

  const info = `Title: ${[title]}, Description: ${[description]}, Poster: ${poster}`;
  console.log(info);
}
