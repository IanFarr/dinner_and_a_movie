function generateRandomRestaurant(priceSelections, location, postRestaurantInfo, revealLanding, hideLoader) {
  const priceSelection = getRandomPriceSelection(priceSelections);
  if (location !== null) {
    callRestaurantApi(priceSelection, location, postRestaurantInfo, revealLanding, hideLoader);
  } else {
    postRestaurantInfo(
      { 
        name: 'Location Required for Restaurant', 
        cuisine: '', 
        address: '', 
        phoneNumber: '', 
        website: '', 
        street: '', 
        city: '' })
  }
}

function getRandomPriceSelection(priceSelections) {
  const priceListLength = priceSelections.length;
  const price = priceSelections[Math.floor(Math.random() * priceListLength)].value;
  return { price };
}

async function callRestaurantApi(priceSelection, location, postRestaurantInfo, revealLanding, hideLoader) {
  console.log(location)

  await axios.post('/api/restaurants', { "price": priceSelection.price, "lat": location.coords.latitude, "long": location.coords.longitude }).then(function (response) {
    const result = response.data.data[Math.floor(Math.random() * 30)];

    let name;
    if (result.name === undefined) {
      name = "Not Available";
    } else {
      name = result.name;
    }

    let street;
    if (result.address_obj.street1 === undefined) {
      street = "Not Available";
    } else {
      street = result.address_obj.street1;
    }

    let city;
    if (result.address_obj.city === undefined) {
      city = "Not Available";
    } else {
      city = result.address_obj.city;
    }

    let address;
    if (result.address === undefined) {
      address = "Not Available";
    } else {
      address = result.address;
    }

    let phoneNumber;
    if (result.phone === undefined) {
      phoneNumber = "Not Available";
    } else {
      phoneNumber = result.phone;
    }
    
    let website;
    if (result.web_url === undefined) {
      website = "Not Available";
    } else {
      website = result.web_url;
    }
    
    let cuisine;
    if (typeof result.cuisine[0] === 'undefined') {
      cuisine = "It's a surprise!";
    } else {
      cuisine = result.cuisine[0].name;
    }

    postRestaurantInfo({ name, cuisine, address, phoneNumber, website, street, city })
  }).catch(function (error) {
    console.error(error);
    hideLoader();
    revealLanding();
    alert('something went wrong');
  });
}