document.addEventListener("DOMContentLoaded", () => {
  console.log('connected')

  let lat;
  let long;

  let x = document.getElementById("demo");
  console.log(x)

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function savePosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat);
    console.log(long);
  }

  const findButton = document.querySelector(".locate");
  findButton.addEventListener('click', event => {
    getLocation();
  })

});