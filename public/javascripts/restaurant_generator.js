function generateRandomRestaurant(priceSelections, postRestaurantInfo) {
  callRestaurantApi(postRestaurantInfo);
}

async function callRestaurantApi(postRestaurantInfo) {
  await axios.post('/api/restaurants', { }).then(function (response) {
    const result = response.data.data[Math.floor(Math.random() * 30)];
    const name = result.name;
    // const cuisine = result.cuisine[0].name;
    const address = result.address;
    const phoneNumber = result.phone;
    const website = result.web_url;
    const price = result.price_level;
    // const picture = result.picture;
    postRestaurantInfo({ name, address, phoneNumber, website, price })
  }).catch(function (error) {
    console.error(error);
  });
}