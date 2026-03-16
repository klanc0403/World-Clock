function updateCity(id, timeZone) {
  let cityElement = document.querySelector(`#${id}`);
  if (!cityElement) return;

  let cityTime = moment().tz(timeZone);

  cityElement.querySelector(".date").innerHTML =
    cityTime.format("MMMM Do YYYY");
  cityElement.querySelector(".time").innerHTML =
    `${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>`;
}

function updateDefaultCities() {
  updateCity("san-francisco", "America/Los_Angeles");
  updateCity("london", "Europe/London");
  updateCity("seoul", "Asia/Seoul");
}

let selectedCityTimeZone = null;
let selectedCityName = null;

function updateSelectedCity() {
  if (!selectedCityTimeZone) return;

  let selectedCityElement = document.querySelector("#selected-city");
  let cityTime = moment().tz(selectedCityTimeZone);

  selectedCityElement.innerHTML = `
    <div class="city">
      <div>
        <h2>${selectedCityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">
        ${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>
      </div>
    </div>
  `;
}

function displaySelectedCity(event) {
  let cityTimeZone = event.target.value;

  if (cityTimeZone === "select") {
    document.querySelector("#cities").style.display = "block";
    document.querySelector("#selected-city").innerHTML = "";
    selectedCityTimeZone = null;
    selectedCityName = null;
    return;
  }

  if (cityTimeZone === "current") {
    selectedCityTimeZone = moment.tz.guess();
    selectedCityName = "My Current Location";
  } else {
    selectedCityTimeZone = cityTimeZone;
    selectedCityName = event.target.options[event.target.selectedIndex].text;
  }

  document.querySelector("#cities").style.display = "none";
  updateSelectedCity();
}

function updateClocks() {
  updateDefaultCities();
  updateSelectedCity();
}

updateClocks();
setInterval(updateClocks, 1000);

let citySelectElement = document.querySelector(".city-select");
citySelectElement.addEventListener("change", displaySelectedCity);
