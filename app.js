const tasteTrip = document.querySelector("#taste_trip");
const delivery = document.querySelector("#delivery");
const deliveryFilter = document.querySelector(".deliveryFilter");
const tasteTripFilter = document.querySelector(".taste_trip_filter");
const filtertext = document.querySelector("#filterRestaurants");
const filtersMainOptionDiv = document.querySelector(".filters");
const filterBtn = document.createElement("button");
filterBtn.classList.add("filterButton");
filterBtn.textContent = "Apply Filters";
const resetFilterBtn = document.createElement("button");
resetFilterBtn.classList.add("resetButton");
resetFilterBtn.textContent = "Reset Filter";
const showfood = document.querySelector(".showFood");
const restaurantsSection = document.createElement("div");
restaurantsSection.classList.add("restaurantsSection");
// showfood.appendChild(restaurantsSection);
const deliverySection = document.createElement("div");
deliverySection.classList.add("restaurantsSection");
// showfood.appendChild(deliverySection);
const optionsAddedMap = {}; // Track which filters have been updated
const filterSelections = {};
tasteTrip.addEventListener("click", () => {
  filtersMainOptionDiv.innerHTML = "";
  filtertext.textContent = " ";
  filtertext.textContent = "Filter Restaurants";

  Object.keys(optionsAddedMap).forEach((key) => {
    optionsAddedMap[key] = false;
  });
  filterOption(filterIdsOfRestaurants, foodTypes, mumbaiLocations);
  restaurantsSection.innerHTML = "";

  if (showfood.contains(deliverySection)) {
    showfood.removeChild(deliverySection);
  }
  showfood.appendChild(restaurantsSection);

  showFoodItems(restaurant, "restaurant");
});
//for delivery
delivery.addEventListener("click", () => {
  filtersMainOptionDiv.innerHTML = " ";
  filtertext.textContent = "";
  filtertext.textContent = "Find Your Perfect Meal";

  Object.keys(optionsAddedMap).forEach((key) => {
    optionsAddedMap[key] = false;
  });
  filterOption(filterIdsOfDelivery, cuisineTypes, categories);
  deliverySection.innerHTML = "";

  if (showfood.contains(restaurantsSection)) {
    showfood.removeChild(restaurantsSection);
  }
  showfood.appendChild(deliverySection);

  showFoodItems(deliveryItems, "delivery");
});
function filterOption(val1, val2, val3) {
  filtersMainOptionDiv.appendChild(resetFilterBtn);
  val1.forEach((selectId) => {
    const select = document.createElement("select");
    select.id = selectId;
    console.log(select.id);
    filtersMainOptionDiv.appendChild(select);

    // Add heading option dynamically
    const headingOption = document.createElement("option");
    headingOption.value = "";
    headingOption.textContent = getHeadingText(selectId);
    headingOption.hidden = true;

    headingOption.selected = true;
    select.appendChild(headingOption);

    if (optionsAddedMap[selectId]) return;

    if (selectId === "cuisineFilterRest" || selectId === "cuisineFilterDeli") {
      populateOptions(select, val2);
    } else if (
      selectId === "locationFilterRest" ||
      selectId === "categoryFilterDeli"
    ) {
      populateOptions(select, val3);
    } else if (selectId === "alcoholFilterRest") {
      select.innerHTML += `
        <option value="Yes">Yes</option>
        <option value="No">No</option>`;
    } else if (selectId === "priceFilterRest") {
      select.innerHTML += `
        <option value="low">Under ₹1000</option>
        <option value="mid">₹1000–₹2000</option>
        <option value="high">Above ₹2000</option>`;
    } else if (selectId === "priceFilterDeli") {
      select.innerHTML += `
        <option value="low">Under ₹200</option>
        <option value="mid">₹200–₹500</option>
        <option value="high">Above ₹500</option>`;
    } else if (selectId === "distanceFilterRest") {
      select.innerHTML += `
        <option value="5">Within 5 km</option>
        <option value="10">Within 10 km</option>
        <option value="20">Within 20 km</option>
        <option value="30">Within 30 km</option>`;
    } else if (selectId === "vegFilterDeli") {
      select.innerHTML += `
        <option value="Yes">Vegetarian</option>
        <option value="No">Non-Vegetarian</option>`;
    } else if (selectId === "ratingFilterDeli") {
      select.innerHTML += `<option>⭐ 3.8+</option>
            <option>⭐ 4.0+</option>
            <option>⭐ 4.5+</option>
            <option>⭐ 4.9+</option>`;
    }

    optionsAddedMap[selectId] = true;

    //using select and appending in object to check which section is actice delivery or restaurant by using their id
    select.addEventListener("change", (e) => {
      const id = e.target.id;
      const selectedValue = e.target.value;
      // Clear irrelevant filters when toggling
      if (showfood.contains(restaurantsSection)) {
        // If restaurant section is active, remove delivery filters
        Object.keys(filterSelections).forEach((key) => {
          if (key.includes("Deli")) {
            delete filterSelections[key];
          }
        });
      }

      if (showfood.contains(deliverySection)) {
        // If delivery section is active, remove restaurant filters
        Object.keys(filterSelections).forEach((key) => {
          if (key.includes("Rest")) {
            delete filterSelections[key];
          }
        });
      }

      // Add/update current selection
      filterSelections[id] = selectedValue;
    });
  });
  filtersMainOptionDiv.appendChild(filterBtn);
}

//filterbtn logic
filterBtn.addEventListener("click", () => {
  const activeType = showfood.contains(restaurantsSection)
    ? "restaurant"
    : "delivery";
  const sourceData = activeType === "restaurant" ? restaurant : deliveryItems;

  const filteredData = sourceData.filter((item) => {
    return Object.entries(filterSelections).every(([key, value]) => {
      if (!value) return true;

      if (key === "cuisineFilterRest") {
        console.log(item.cuisine_type);
        return item.food_type.includes(value);
      }

      if (key === "cuisineFilterDeli") {
        return item.cuisine_type === value;
      }

      if (key === "locationFilterRest") return item.location === value;
      if (key === "categoryFilterDeli") return item.category === value;
      if (key === "alcoholFilterRest") return item.alcohol === value;

      if (key === "priceFilterRest") {
        if (value === "low") return item.price_for_two < 1000;
        if (value === "mid")
          return item.price_for_two >= 1000 && item.price_for_two <= 2000;
        if (value === "high") return item.price_for_two > 2000;
      }

      if (key === "priceFilterDeli") {
        if (value === "low") return item.price < 200;
        if (value === "mid") return item.price >= 200 && item.price <= 500;
        if (value === "high") return item.price > 500;
      }
      if (key === "distanceFilterRest") {
        const itemDistance = parseFloat(item.distance_from_customer_house); // e.g., "3.29 km" → 3.29
        const filterDistance = parseFloat(value); // e.g., "5"
        return itemDistance <= filterDistance;
      }

      if (key === "vegFilterDeli") return item.is_veg === (value === "Yes");
      if (key === "ratingFilterDeli") {
        const ratingThreshold = parseFloat(
          value.replace("⭐ ", "").replace("+", "")
        );
        return item.rating >= ratingThreshold;
      }
    });
  });
  showFoodItems(filteredData, activeType);
});

//resetbtn the filterlogic
resetFilterBtn.addEventListener("click", () => {
  Object.keys(filterSelections).forEach((key) => {
    filterSelections[key] = "";
    // select is dynamically created
    const select = document.getElementById(key);
    if (select) select.value = "";
    console.log(filterSelections);
  });
  const activeType = showfood.contains(restaurantsSection)
    ? "restaurant"
    : "delivery";
  const sourceData = activeType === "restaurant" ? restaurant : deliveryItems;
  showFoodItems(sourceData, activeType);
});
function getHeadingText(id) {
  if (id === "cuisineFilterRest" || id === "cuisineFilterDeli") {
    return "Cuisine Type";
  } else if (id === "locationFilterRest") {
    return "Restaurant Location";
  } else if (id === "alcoholFilterRest") {
    return "Serves Alcohol";
  } else if (id === "priceFilterRest" || id === "priceFilterDeli") {
    return "Price Range";
  } else if (id === "distanceFilterRest") {
    return "Distance";
  } else if (id === "categoryFilterDeli") {
    return "Food Category";
  } else if (id === "vegFilterDeli") {
    return "Veg / Non-Veg";
  } else if (id === "ratingFilterDeli") {
    return "Minimum Rating";
  } else {
    return "Select Option";
  }
}

function populateOptions(selectElement, optionArray) {
  optionArray.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

const showFood = document.querySelector(".showFood");

function showFoodItems(dataArray, type) {
  showFood.style.display = "block";
  let delay = 0;

  // Clear the appropriate section
  if (type === "restaurant") {
    restaurantsSection.innerHTML = "";
  } else if (type === "delivery") {
    deliverySection.innerHTML = "";
  }

  dataArray.forEach((item, index) => {
    let html = "";

    if (type === "restaurant") {
      html = `
      <div class="restaurantsDetail" data-aos="fade-up"  data-index="${index}">
      
        <div class="restaurantsImg">
          <img src="assets/${item.image}.jpg" alt="" />
        </div>
        <div class="restaurantsDescription">
          <div class="restaurantsAllDetail">
            <p class="name">${item.rest_name}</p>
            <p class="ratings">${(Math.random() * 2 + 3).toFixed(1)}
              <span class="star-icon">★</span>
            </p>
          </div>
          <div class="restaurantsAllDetail">
            <p class="food_type" data-food='${JSON.stringify(
              item.food_type
            )}'>${item.food_type.slice(0, 2).join(" , ")}${
        item.food_type.length > 2 ? "..." : ""
      }</p>
            <p class="two_price">price-of-two: ${item.price_for_two}</p>
          </div>
          <div class="restaurantsAllDetail">
            <p class="location">${item.location}</p>
          </div>
          <div class="restaurantsAllDetail">
            <p class="time">Time: ${item.restaurant_open_time}-${
        item.restaurant_close_time
      }</p>
            <p class="distance">${item.distance_from_customer_house}</p>
          </div>
        </div>
      </div>`;
      restaurantsSection.innerHTML += html;
    }

    if (type === "delivery") {
      html = `
      <div class="deliveryDetail" data-aos="fade-up">
        <div class="deliveryImg">
          <img src="assets/${item.image}.png" alt="${item.name}" />
        </div>
        <div class="deliveryDescription">
          <div class="deliveryAllDetail">
            <p class="name">${item.name}</p>
          </div>
          <div class="deliveryAllDetail">
            <p class="price">₹${item.price}</p>
            <p class="ratings">⭐ ${item.rating}</p>
          </div>
          <div class="deliveryAllDetail">
            <p class="time">⏱️ ${item.prep_time} min</p>
          </div>
          
        </div>
      </div>`;
      deliverySection.innerHTML += html;
    }

    delay += 100;
  });
  allCardsRestaurantAndDelivery(dataArray, type);

  AOS.refresh();
}

const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  const scrollThreshold = 150; // Show button after scrolling 150px

  if (window.scrollY > scrollThreshold) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  document.querySelector(".mainBody").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

function allCardsRestaurantAndDelivery(dataArray, type) {
  const allCards = document.querySelectorAll(
    ".restaurantsDetail, .deliveryDetail"
  );

  detailShow(allCards, dataArray, type, menuImages);
}
function detailShow(allCards, dataArray, type, menu) {
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const detailPanel = document.getElementById("detailPanel");
      detailPanel.innerHTML = ""; // Clear previous content

      const restaurantIndex = card.getAttribute("data-index");
      const itemData = dataArray[restaurantIndex];
      const rating = card.querySelector(".ratings")?.textContent || "No rating";

      let foodTypesHTML = "";
      let alcoholHTML = "";
      let cartControlHTML = "";
      if (itemData.food_type) {
        foodTypesHTML = `<p><strong>Food Types:</strong> ${itemData.food_type.join(
          ", "
        )}</p>`;
      }

      if (itemData.alcohol !== undefined) {
        alcoholHTML = `<p><strong>Alcohol:</strong> ${itemData.alcohol}</p>`;
      }
      if (type === "delivery") {
        cartControlHTML = `<div class="cartControls">
            <button id="minusBtn">–</button>
            <span id="cartCount">0</span>
            <button id="plusBtn">+</button>
            <button id="addCartBtn">Add to Cart</button>
          </div>`;
      } else {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const minDate = today.toISOString().split("T")[0];
        const maxDate = nextWeek.toISOString().split("T")[0];

        bookTableHTML = `
  <div class="booking-section">
    <label for="bookingDate"><strong>Select Date:</strong></label>
    <input type="date" id="bookingDate" min="${minDate}" max="${maxDate}" />
    <button id="bookTableBtn" class="book-table-btn">📅 Book a Table</button>
  </div>
`;
      }
      detailPanel.innerHTML = `
  <div class="detail-content split-layout">
    <div class="left-section">
      <span id="closeDetail" class="close-btn">×</span>
      <div><img id="detailImg" src="./assets/${itemData.image}.jpg" alt="Restaurant Image" /></div>
      <div id="detailInfo">
        <h2>${itemData.rest_name}</h2>
        <p>${rating}</p>
        <p><strong>Price for Two: </strong>₹${itemData.price_for_two}</p>
        ${foodTypesHTML}
        ${alcoholHTML}
        <p><strong>Location: </strong>${itemData.location}</p>
        <p><strong>Distance from you:</strong> ${itemData.distance_from_customer_house}</p> 
        <p><strong>Open at: </strong> ${itemData.restaurant_open_time}</p>
        <p><strong>Close at: </strong> ${itemData.restaurant_close_time}</p>
      </div>
      ${bookTableHTML}
      ${cartControlHTML}
      
    </div>

    <div class="right-section">
    <div class="slider-frame">
    <img id="sliderImage" src="./menuImg/${menu[0]}.png" alt="Menu Item" />
    </div>
    <div class="slider-controls">
    <button id="prevBtn">← Prev</button>
    <button id="nextBtn">Next →</button>
    </div>
  </div>


  </div>
`;

      detailPanel.style.display = "flex";

      // Reattach listeners
      document.getElementById("closeDetail").addEventListener("click", () => {
        detailPanel.style.display = "none";
      });

      document.getElementById("plusBtn").addEventListener("click", () => {
        const countSpan = document.getElementById("cartCount");
        countSpan.textContent = parseInt(countSpan.textContent) + 1;
      });

      document.getElementById("minusBtn").addEventListener("click", () => {
        const countSpan = document.getElementById("cartCount");
        const current = parseInt(countSpan.textContent);
        if (current > 0) countSpan.textContent = current - 1;
      });
    });
  });
}
