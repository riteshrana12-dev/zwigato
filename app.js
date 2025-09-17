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

  showRestaurants(restaurant);
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

  showDelivery(deliveryItems);
});
function filterOption(val1, val2, val3) {
  filtersMainOptionDiv.appendChild(resetFilterBtn);
  val1.forEach((selectId) => {
    const select = document.createElement("select");
    select.id = selectId;
    // console.log(select.id);
    filtersMainOptionDiv.appendChild(select);

    // Add heading option dynamically
    const headingOption = document.createElement("option");
    headingOption.value = "";
    headingOption.textContent = getHeadingText(selectId);
    headingOption.hidden = true;

    headingOption.selected = true;
    select.appendChild(headingOption);

    select.addEventListener("click", (e) => {
      const id = e.target.id;
      const selectedValue = e.target.value;
      // console.log(selectedValue);

      filterBtn.addEventListener("click", () => {
        const filters = {};

        document.querySelectorAll(".filters select").forEach((select) => {
          const id = select.id;
          const value = select.value;
          if (value) filters[id] = value;
        });

        const isTasteTripActive = showfood.contains(restaurantsSection);
        const dataToFilter = isTasteTripActive ? restaurant : deliveryItems;

        const filteredData = applyFilters(dataToFilter, filters);

        if (isTasteTripActive) {
          restaurantsSection.innerHTML = "";
          showRestaurants(filteredData);
        } else {
          deliverySection.innerHTML = "";
          showDelivery(filteredData);
        }
      });
      // console.log(id);

      if (optionsAddedMap[id]) return; // Already listed
      console.log(optionsAddedMap);

      if (id === "cuisineFilterRest" || id === "cuisineFilterDeli") {
        populateOptions(select, val2);
      } else if (id === "locationFilter" || id === "categoryFilter") {
        populateOptions(select, val3);
      } else if (id === "alcoholFilter") {
        select.innerHTML += `
        <option value="Yes">Yes</option>
        <option value="No">No</option>`;
      } else if (id === "priceFilterRest") {
        select.innerHTML += `
        <option value="low">Under ₹1000</option>
        <option value="mid">₹1000–₹2000</option>
        <option value="high">Above ₹2000</option>`;
      } else if (id === "priceFilterDeli") {
        select.innerHTML += `
        <option value="low">Under ₹200</option>
        <option value="mid">₹200–₹500</option>
        <option value="high">Above ₹500</option>`;
      } else if (id === "distanceFilter") {
        select.innerHTML += `
        <option value="5">Within 5 km</option>
        <option value="10">Within 10 km</option>
        <option value="20">Within 20 km</option>
        <option value="30">Within 30 km</option>`;
      } else if (id === "vegFilter") {
        select.innerHTML += `
        <option value="Yes">Vegetarian</option>
        <option value="No">Non-Vegetarian</option>`;
      } else if (id === "ratingFilter") {
        select.innerHTML += `<option>⭐ 3.8+</option>
            <option>⭐ 4.0+</option>
            <option>⭐ 4.5+</option>
            <option>⭐ 4.9+</option>`;
      }

      optionsAddedMap[id] = true; // Mark as option listed
    });
  });
  filtersMainOptionDiv.appendChild(filterBtn);

  // console.log(value);
}
function applyFilters(dataArray, filters) {
  return dataArray.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Skip empty filters

      switch (key) {
        case "cuisineFilterRest":
        case "cuisineFilterDeli":
          return item.food_type === value || item.cuisine === value;
        case "locationFilter":
          return item.location === value;
        case "ratingFilter":
          return (
            parseFloat(item.rating) >= parseFloat(value.replace("⭐ ", ""))
          );
        case "priceFilterRest":
          return matchPrice(item.price_for_two, value);
        case "priceFilterDeli":
          return matchPrice(item.price, value);
        case "distanceFilter":
          return parseInt(item.distance_from_customer_house) <= parseInt(value);
        default:
          return true;
      }
    });
  });
}

function matchPrice(price, range) {
  if (range === "low") return price <= 1000;
  if (range === "mid") return price > 1000 && price <= 2000;
  if (range === "high") return price > 2000;
  return true;
}
function filteringRestaurantandDelivery(receiveValue) {
  console.log("Filtering by:", receiveValue);
  console.log("Restaurant data:", restaurant);

  const filterData = restaurant.filter((item) => {
    return item.food_type.toLowerCase() === receiveValue.toLowerCase();
  });

  // console.log("Filtered results:", filterData);
  showRestaurants(filterData);
}

function getHeadingText(id) {
  if (id === "cuisineFilterRest" || id === "cuisineFilterDeli") {
    return "Cuisine Type";
  } else if (id === "locationFilter") {
    return "Restaurant Location";
  } else if (id === "alcoholFilter") {
    return "Serves Alcohol";
  } else if (id === "priceFilterRest" || id === "priceFilterDeli") {
    return "Price Range";
  } else if (id === "distanceFilter") {
    return "Distance";
  } else if (id === "categoryFilter") {
    return "Food Category";
  } else if (id === "vegFilter") {
    return "Veg / Non-Veg";
  } else if (id === "ratingFilter") {
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

function showRestaurants(restaurantArray) {
  showFood.style.display = "block";
  let delay = 0;
  restaurantsSection.innerHTML = "";

  restaurantArray.forEach((restObj) => {
    restaurantsSection.innerHTML += `
    <div class="restaurantsDetail " data-aos="fade-up">
            <div class="restaurantsImg">
              <img src="assets/${restObj.image}.jpg" alt="" />
            </div>
            <div class="restaurantsDescription">
              <div class="restaurantsAllDetail">
                <p class="name">${restObj.rest_name}</p>
                <p class="ratings">${(Math.random() * 2 + 3).toFixed(1)}
                 <span class="star-icon">★</span>
    </p>
              </div>
              <div class="restaurantsAllDetail">
                <p class="food_type">${restObj.food_type
                  .slice(0, 2)
                  .join(" , ")}
  ${restObj.food_type.length > 2 ? "..." : ""}

</p>
                <p class="two_price">price-of-two: ${restObj.price_for_two}</p>
              </div>
              <div class="restaurantsAllDetail">
                <p class="location">${restObj.location}</p>
              </div>
              <div class="restaurantsAllDetail">
                <p class="time">Time:${restObj.restaurant_open_time}-${
      restObj.restaurant_close_time
    } </p>
                <p class="distance">${restObj.distance_from_customer_house}</p>
              </div>
            </div>
          </div>`;
    // console.log(restObj.image);
    delay += 100;
  });
  AOS.refresh();
}

function showDelivery(deliveryArray) {
  showFood.style.display = "block";
  let delay = 0;

  deliveryArray.forEach((delObj) => {
    deliverySection.innerHTML += `
  <div class="deliveryDetail " data-aos="fade-up">
    
    <!-- Image Section -->
    <div class="deliveryImg">
      <img src="assets/${delObj.image}.png" alt="${delObj.name}" />
    </div>

    <!-- Description Section -->
    <div class="deliveryDescription">
      
      <!-- Name -->
      <div class="deliveryAllDetail">
        <p class="name">${delObj.name}</p>
      </div>

      <!-- Price & Rating -->
      <div class="deliveryAllDetail">
        <p class="price">₹${delObj.price}</p>
        <p class="ratings">⭐ ${delObj.rating}</p>
      </div>

      <!-- Prep Time -->
      <div class="deliveryAllDetail">
        <p class="time">⏱️ ${delObj.prep_time} min</p>
      </div>

      <!-- Quantity Controls -->
      <div class="deliveryAllDetail quantityControl">
        <button class="qtyBtn" onclick="decreaseQty(this)">−</button>
        <span class="qtyDisplay">0</span>
        <button class="qtyBtn" onclick="increaseQty(this)">+</button>
      </div>

    </div>
  </div>
`;
    delay += 100;
  });
  AOS.refresh();
}

const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1000) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  const target = document.querySelector(".mainBody");
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

filterBtn.addEventListener("click", (e) => {
  console.log(e);
});
