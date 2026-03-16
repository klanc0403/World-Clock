function updateClock() {
  let sanFrancisco = moment().tz("America/Los_Angeles");
  let london = moment().tz("Europe/London");
  let seoul = moment().tz("Asia/Seoul");

  document.querySelector("#san-francisco-date").innerHTML =
    sanFrancisco.format("MMMM Do YYYY");
  document.querySelector("#san-francisco-time").innerHTML =
    sanFrancisco.format("h:mm:ss") +
    ` <small>${sanFrancisco.format("A")}</small>`;

  document.querySelector("#london-date").innerHTML =
    london.format("MMMM Do YYYY");
  document.querySelector("#london-time").innerHTML =
    london.format("h:mm:ss") + ` <small>${london.format("A")}</small>`;

  document.querySelector("#seoul-date").innerHTML =
    seoul.format("MMMM Do YYYY");
  document.querySelector("#seoul-time").innerHTML =
    seoul.format("h:mm:ss") + ` <small>${seoul.format("A")}</small>`;
}

updateClock();
setInterval(updateClock, 1000);
