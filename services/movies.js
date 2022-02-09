const axios = require('axios').default;

function get(service, genre, page) {
  var options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/pro',
    params: {
      country: 'us',
      service: service,
      type: 'movie',
      order_by: 'original_title',
      genre: genre,
      page: page,
      desc: 'true',
      language: 'en',
      output_language: 'en'
    },
    headers: {
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
      'x-rapidapi-key': process.env.STREAMING_AVAILABILITY_API_KEY
    }
  };

  return axios.request(options).then(res => res.data);
  // return axios.request(options).then(res => res.response);
}

// sugar: can also be {get: get}
module.exports = { get };
