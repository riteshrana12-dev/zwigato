document.addEventListener("DOMContentLoaded", () => {
  const foodHistoryEl = document.getElementById("foodHistory");
  const tableHistoryEl = document.getElementById("tableHistory");
  const showFoodBtn = document.getElementById("showFood");
  const showTableBtn = document.getElementById("showTable");
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  document.body.classList.toggle("light-mode", savedTheme === "light");

  let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

  const foodOrders = history.filter((h) => h.type === "food");
  const tableBookings = history.filter((h) => h.type === "table");

  // Render food orders
  foodHistoryEl.innerHTML = "";
  if (foodOrders.length === 0) {
    foodHistoryEl.innerHTML = "<p>No food orders found.</p>";
  } else {
    foodOrders.forEach((order, index) => {
      const div = document.createElement("div");
      div.className = "history-card";
      div.innerHTML = `
        <button class="delete-btn" data-index="${index}" data-type="food">❌</button>
        <h4>🛒 Food Order (${new Date(order.timestamp).toLocaleString()})</h4>
        <ul>
          ${order.items
            .map(
              (item) => `
            <li>${item.name} × ${item.quantity} = ₹${item.totalPrice}</li>
          `
            )
            .join("")}
        </ul>
        <p><strong>Total:</strong> ₹${order.totalPrice}</p>
      `;
      foodHistoryEl.appendChild(div);
    });
  }

  // Render table bookings
  tableHistoryEl.innerHTML = "";
  if (tableBookings.length === 0) {
    tableHistoryEl.innerHTML = "<p>No table bookings found.</p>";
  } else {
    tableBookings.forEach((booking, index) => {
      const div = document.createElement("div");
      div.className = "history-card";
      div.innerHTML = `
        <button class="delete-btn" data-index="${index}" data-type="table">❌</button>
        <h4>📅 Table Booking (${new Date(
          booking.timestamp
        ).toLocaleString()})</h4>
        <p><strong>Restaurant:</strong> ${booking.restaurant || "Unknown"}</p>
        <p><strong>Date:</strong> ${booking.date || "Not set"}</p>
        <p><strong>Time:</strong> ${booking.time || "Not set"}</p>
        <p><strong>People:</strong> ${booking.people || "?"}</p>
        <p><strong>Token:</strong> ${booking.token || "N/A"}</p>
      `;
      tableHistoryEl.appendChild(div);
    });
  }

  // Delete handler
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      const type = btn.getAttribute("data-type");

      // Rebuild history without the deleted item
      history = history.filter((entry, i) => {
        if (entry.type === type) {
          const filtered = history.filter((h) => h.type === type);
          return i !== history.indexOf(filtered[index]);
        }
        return true;
      });

      localStorage.setItem("orderHistory", JSON.stringify(history));
      localStorage.setItem("activeHistoryTab", type); // Save current tab
      location.reload();
    });
  });

  // Toggle logic
  function toggleView(showFood) {
    if (showFood) {
      foodHistoryEl.classList.add("active");
      tableHistoryEl.classList.remove("active");
      showFoodBtn.classList.add("active-btn");
      showTableBtn.classList.remove("active-btn");
    } else {
      tableHistoryEl.classList.add("active");
      foodHistoryEl.classList.remove("active");
      showTableBtn.classList.add("active-btn");
      showFoodBtn.classList.remove("active-btn");
    }
  }

  showFoodBtn.addEventListener("click", () => toggleView(true));
  showTableBtn.addEventListener("click", () => toggleView(false));

  const activeTab = localStorage.getItem("activeHistoryTab");
  toggleView(activeTab === "table" ? false : true); // Show saved tab
  localStorage.removeItem("activeHistoryTab"); // Clean up
});
