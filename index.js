const express = require('express')
var axios = require("axios").default;
const app = express()
const port = 3000

app.use(express.json());

app.post('/api/movie', (req, res) => {
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
      'x-rapidapi-key': process.env.STREAMING_AVAILABILITY_API_KEY
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data)
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('assets'))