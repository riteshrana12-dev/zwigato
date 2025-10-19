document.addEventListener("DOMContentLoaded", () => {
  const dateSelect = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const peopleInput = document.getElementById("people");
  const restaurantNameInput = document.getElementById("restaurantName");
  const bookingForm = document.getElementById("bookingForm");
  const bookingToken = document.getElementById("bookingToken");
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  document.body.classList.toggle("light-mode", savedTheme === "light");

  // Populate next 7 days
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const option = document.createElement("option");
    option.value = date.toISOString().split("T")[0];
    option.textContent = date.toDateString();
    dateSelect.appendChild(option);
  }

  // Get restaurant name from query param or localStorage
  const params = new URLSearchParams(window.location.search);
  const restName = params.get("restaurant") || "Unknown Restaurant";
  restaurantNameInput.value = restName;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedDate = dateSelect.value;
    const selectedTime = timeInput.value;
    const people = peopleInput.value;
    const restaurant = restaurantNameInput.value;

    const token = `#${Math.floor(Math.random() * 100000)}-${Date.now()}`;

    // ✅ Save booking to history
    const bookingHistory =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    bookingHistory.push({
      type: "table",
      restaurant,
      date: selectedDate,
      time: selectedTime,
      people,
      token,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("orderHistory", JSON.stringify(bookingHistory));

    bookingToken.innerHTML = `
       Booking Confirmed!<br>
       Token: ${token}<br>
       Restaurant: ${restaurant}<br>
       Date: ${selectedDate}<br>
       Time: ${selectedTime}<br>
       People: ${people}
    `;
  });
});
