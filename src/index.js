function displayCityTime(event) {
  let city = event.target.value;
  let cityTimeElement = document.querySelector("#city-time");

  if (city === "select") {
    cityTimeElement.innerHTML = "👉 City time here 👈";
    return;
  }

  let timeZone = "";

  if (city === "Paris") {
    timeZone = "Europe/Paris";
  } else if (city === "Tokyo") {
    timeZone = "Asia/Tokyo";
  } else if (city === "Sydney") {
    timeZone = "Australia/Sydney";
  }

  let cityTime = moment().tz(timeZone).format("dddd, MMMM D, YYYY h:mm:ss A");

  cityTimeElement.innerHTML = `It is ${cityTime} in ${city}`;
}

let countriesElement = document.querySelector("#countries");
countriesElement.addEventListener("change", displayCityTime);
