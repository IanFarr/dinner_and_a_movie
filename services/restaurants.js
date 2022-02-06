var axios = require("axios").default;

function get(price) {
  var options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: '37.7573',
      longitude: '-122.5082',
      limit: '30',
      currency: 'USD',
      restaurant_dining_options: 'delivery',
      prices_restaurants: price,
      distance: '2',
      open_now: 'true',
      lunit: 'km',
      lang: 'en_US'
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': process.env.TRAVEL_ADVISOR_API_KEY
    }
  };

  return axios.request(options).then(res => res.data);
}


module.exports = { get };