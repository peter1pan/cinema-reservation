const container = document.querySelector(".container");
const count = document.querySelector(".count");
const amount = document.querySelector(".amount");
const selected = document.querySelector("#movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getLocalStroge();
calculatorSeatPrice();

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculatorSeatPrice();
  }
});

selected.addEventListener("change", function (e) {
  calculatorSeatPrice();
});

function calculatorSeatPrice() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatArr.push(seat);
  });

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  let selectedSeatIndexs = selectedSeatArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  let totalSeatSelected = selectedSeats.length;
  count.innerText = totalSeatSelected;
  amount.innerText = totalSeatSelected * selected.value;

  savetoLocalStroge(selectedSeatIndexs);
}

function getLocalStroge() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    selected.selectedIndex = selectedMovieIndex;
  }
}

function savetoLocalStroge(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", selected.selectedIndex);
}
