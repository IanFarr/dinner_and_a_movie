const axios = require('axios').default;

function get(service, genre, page) {
  var options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
      country: 'us',
      service: service,
      type: 'movie',
      genre: genre,
      page: page,
      output_language: 'en',
      language: 'en'
    },
    headers: {
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
      'x-rapidapi-key': process.env.STREAMING_AVAILABILITY_API_KEY
    }
  };

  return axios.request(options).then(res => res.data);
}

// sugar: can also be {get: get}
module.exports = { get };
