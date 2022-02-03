var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/search/basic',
  params: {
    country: 'us',
    service: 'netflix',
    type: 'movie',
    genre: '18',
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
  let result = response.data;
  // console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

console.log(result)