let selectedCityTimeZone = null;

function updateDefaultCities() {
  let sanFranciscoElement = document.querySelector("#san-francisco");
  let londonElement = document.querySelector("#london");
  let seoulElement = document.querySelector("#seoul");

  if (sanFranciscoElement) {
    let sanFranciscoTime = moment().tz("America/Los_Angeles");
    sanFranciscoElement.querySelector(".date").innerHTML =
      sanFranciscoTime.format("MMMM Do YYYY");
    sanFranciscoElement.querySelector(".time").innerHTML =
      `${sanFranciscoTime.format("h:mm:ss")} <small>${sanFranciscoTime.format("A")}</small>`;
  }

  if (londonElement) {
    let londonTime = moment().tz("Europe/London");
    londonElement.querySelector(".date").innerHTML =
      londonTime.format("MMMM Do YYYY");
    londonElement.querySelector(".time").innerHTML =
      `${londonTime.format("h:mm:ss")} <small>${londonTime.format("A")}</small>`;
  }

  if (seoulElement) {
    let seoulTime = moment().tz("Asia/Seoul");
    seoulElement.querySelector(".date").innerHTML =
      seoulTime.format("MMMM Do YYYY");
    seoulElement.querySelector(".time").innerHTML =
      `${seoulTime.format("h:mm:ss")} <small>${seoulTime.format("A")}</small>`;
  }
}

function updateSelectedCity() {
  if (!selectedCityTimeZone) {
    return;
  }

  let selectedCityElement = document.querySelector("#selected-city");
  let cityTime = moment().tz(selectedCityTimeZone);
  let cityName = selectedCityTimeZone.replace("_", " ").split("/")[1];

  selectedCityElement.innerHTML = `
    <div class="city">
      <div>
        <h2>${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">
        ${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>
      </div>
    </div>
  `;
}

function displaySelectedCity(event) {
  selectedCityTimeZone = event.target.value;

  if (selectedCityTimeZone === "select") {
    return;
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
