function generateRandomRestaurant(priceSelections, location, postRestaurantInfo) {
  const priceSelection = getRandomPriceSelection(priceSelections);
  callRestaurantApi(priceSelection, postRestaurantInfo);
}

function getRandomPriceSelection(priceSelections) {
  const priceListLength = priceSelections.length;
  const price = priceSelections[Math.floor(Math.random() * priceListLength)].value;
  return { price };
}

async function callRestaurantApi(priceSelection, postRestaurantInfo) {
  await axios.post('/api/restaurants', { "price": priceSelection.id }).then(function (response) {
    const result = response.data.data[Math.floor(Math.random() * 30)];
    const name = result.name;
    const cuisine = result.cuisine[0].name;
    const address = result.address;
    const phoneNumber = result.phone;
    const website = result.web_url;
    postRestaurantInfo({ name, cuisine, address, phoneNumber, website })
  }).catch(function (error) {
    console.error(error);
  });
}