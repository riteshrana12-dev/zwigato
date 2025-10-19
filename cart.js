document.addEventListener("DOMContentLoaded", () => {
  const orderList = document.getElementById("orderList");
  const totalPriceEl = document.getElementById("totalPrice");
  const confirmation = document.getElementById("confirmation");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  document.body.classList.toggle("light-mode", savedTheme === "light");

  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cart.length === 0) {
    orderList.innerHTML = "<p>No items in cart.</p>";
    placeOrderBtn.style.display = "none";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-details">
        <p><strong>${item.name}</strong></p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ₹${itemTotal}</p>
      </div>
    `;

    orderList.appendChild(itemDiv);
  });

  totalPriceEl.textContent = `Total: ₹${total}`;

  placeOrderBtn.addEventListener("click", () => {
    // ✅ Save to orderHistory before clearing
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push({
      type: "food",
      items: cart,
      totalPrice: total,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    // ✅ Confirm and clear cart
    confirmation.textContent = "✅ Order placed successfully!";
    localStorage.removeItem("cartItems");
    orderList.innerHTML = "";
    totalPriceEl.textContent = "";
    placeOrderBtn.style.display = "none";
  });
});
