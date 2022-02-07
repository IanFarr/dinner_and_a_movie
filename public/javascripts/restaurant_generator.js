function generateRandomRestaurant(priceSelections, location, postRestaurantInfo) {
  const priceSelection = getRandomPriceSelection(priceSelections);
  callRestaurantApi(priceSelection, location, postRestaurantInfo);
}

function getRandomPriceSelection(priceSelections) {
  const priceListLength = priceSelections.length;
  const price = priceSelections[Math.floor(Math.random() * priceListLength)].value;
  return { price };
}

async function callRestaurantApi(priceSelection, location, postRestaurantInfo) {
  await axios.post('/api/restaurants', { "price": priceSelection.price, "lat": location.coords.latitude, "long": location.coords.longitude }).then(function (response) {
    const result = response.data.data[Math.floor(Math.random() * 30)];
    const name = result.name;
    const cuisine = result.cuisine[0].name || "mystery";
    const address = result.address;
    const phoneNumber = result.phone;
    const website = result.web_url;
    postRestaurantInfo({ name, cuisine, address, phoneNumber, website })
  }).catch(function (error) {
    console.error(error);
  });
}