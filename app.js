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
  showsearch(restaurantNames, restaurant, "restaurant");
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
  showsearch(foodNames, deliveryItems, "delivery");
});
function filterOption(val1, val2, val3) {
  filtersMainOptionDiv.appendChild(resetFilterBtn);
  val1.forEach((selectId) => {
    const select = document.createElement("select");
    select.id = selectId;
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
  if (!dataArray || dataArray.length === 0) {
    if (type === "restaurant") {
      detailPanel.innerHTML = `<p style="color: white; font-size: 3rem">Sorry, we couldn’t find any restaurants.
</p>
    <span id="closeDetail" class="close-btn">×</span>
    `;
      detailPanel.style.display = "flex";
      attachCloseListener();
    } else if (type === "delivery") {
      detailPanel.innerHTML = `<p style="color: white; font-size: 3rem">Sorry, we couldn’t find any item.
</p>
    <span id="closeDetail" class="close-btn">×</span>
    `;
      detailPanel.style.display = "flex";
      attachCloseListener();
    }
    return;
  } else {
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
        <div class="deliveryDetail" data-aos="fade-up" data-index="${index}">
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

    try {
      if (window.AOS && typeof window.AOS.refresh === "function") {
        AOS.refresh();
      }
    } catch (e) {
      console.warn("AOS refresh failed:", e);
    }
  }
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
const detailPanel = document.getElementById("detailPanel");
function detailShow(allCards, dataArray, type, menu) {
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      detailPanel.innerHTML = ""; // Clear previous content

      let foodTypesHTML = "";
      let alcoholHTML = "";

      if (type === "delivery") {
        const deliveryIndex = card.getAttribute("data-index");
        const itemData = dataArray[deliveryIndex];

        detailPanel.innerHTML = `
          <div class="detail-deli vertical-layout">
            <span id="closeDetail" class="close-btn">×</span>

            <!-- Top: Food Image -->
            <div class="food-image">
              <img id="detailImgdeli" src="./assets/${
                itemData.image
              }.png" alt="${itemData.name}" />
            </div>

            <!-- Middle: Item Info -->
            <div class="item-info-deli">
              <h2>${itemData.name}</h2>
              <p><strong>Category:</strong> ${itemData.category}</p>
              <p><strong>Cuisine:</strong> ${itemData.cuisine_type}</p>
              <p><strong>Price:</strong> ₹${itemData.price}</p>
              <p><strong>Veg:</strong> ${itemData.is_veg ? "Yes" : "No"}</p>
              <p><strong>Rating:</strong> ⭐ ${itemData.rating}</p>
              <p><strong>Prep Time:</strong> ⏱️ ${itemData.prep_time} mins</p>
            </div>

            <!-- Bottom: Cart Controls -->
            <div class="cartControls">
              <button id="minusBtn">–</button>
              <span id="cartCount">0</span>
              <button id="plusBtn">+</button>
              <button id="addCartBtn">Add to Cart</button>
            </div>
          </div>
        `;

        detailPanel.style.display = "flex";
      } else {
        const restaurantIndex = card.getAttribute("data-index");
        const itemData = dataArray[restaurantIndex];
        const rating =
          card.querySelector(".ratings")?.textContent || "No rating";

        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const minDate = today.toISOString().split("T")[0];
        const maxDate = nextWeek.toISOString().split("T")[0];

        if (itemData.food_type) {
          foodTypesHTML = `<p><strong>Food Types:</strong> ${itemData.food_type.join(
            ", "
          )}</p>`;
        }

        if (itemData.alcohol !== undefined) {
          alcoholHTML = `<p><strong>Alcohol:</strong> ${itemData.alcohol}</p>`;
        }

        detailPanel.innerHTML = `
          <div class="detail-rest split-layout">
            <div class="left-section">
              <span id="closeDetail" class="close-btn">×</span>
              <div>
                <img id="detailImg" src="./assets/${itemData.image}.jpg" alt="Restaurant Image" />
              </div>
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
              <div class="booking-section">
                <label for="bookingDate"><strong>Select Date:</strong></label>
                <input type="date" id="bookingDate" min="${minDate}" max="${maxDate}" />
                <button id="bookTableBtn" class="book-table-btn">📅 Book a Table</button>
              </div>
            </div>

            <div class="right-section">
              <div class="slider-frame">
                <img id="sliderImage" src="" alt="Menu Item" />
              </div>
              <div class="slider-controls">
                <button id="prevBtn">← Prev</button>
                <button id="nextBtn">Next →</button>
              </div>
            </div>
          </div>
        `;

        detailPanel.style.display = "flex";

        // ✅ Now attach slider logic AFTER HTML is injected
        const sliderImage = document.getElementById("sliderImage");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        let currentSlideIndex = 0;

        function updateSliderImage() {
          if (menu.length > 0) {
            sliderImage.src = `./menuImg/${menu[currentSlideIndex]}.png`;
          }
        }

        function updateButtonStates() {
          prevBtn.disabled = currentSlideIndex === 0;
          nextBtn.disabled = currentSlideIndex === menu.length - 1;
        }

        if (prevBtn && nextBtn && sliderImage) {
          prevBtn.addEventListener("click", () => {
            if (currentSlideIndex > 0) {
              currentSlideIndex--;
              updateSliderImage();
              updateButtonStates();
            }
          });

          nextBtn.addEventListener("click", () => {
            if (currentSlideIndex < menu.length - 1) {
              currentSlideIndex++;
              updateSliderImage();
              updateButtonStates();
            }
          });

          updateSliderImage();
          updateButtonStates();
        }
      }

      // Close button
      attachCloseListener();
      cartFunction();
    });
  });
}

// search bar functionality

const suggestionsBox = document.querySelector("#suggestions");
const searchBtn = document.querySelector("#searchBtn");

function showsearch(searchData, dataArray, type) {
  const searchBar = document.querySelector(".searchBar");
  const input = document.querySelector("#searchInput");
  input.value = "";
  input.placeholder =
    type === "delivery" ? "Search food" : "Search Restaurants";
  searchBar.style.display = "flex";

  let currentQuery = "";
  let press;
  function updateSuggestions(query) {
    console.log(query);
    console.log(searchData);
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = searchData.filter((item) =>
      item.toLowerCase().startsWith(query)
    );
    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    suggestionsBox.style.display = "block";
    matches.forEach((match) => {
      const div = document.createElement("div");
      div.textContent = match;
      div.classList.add("suggestion-item");
      suggestionsBox.appendChild(div);
      div.addEventListener("click", (e) => {
        divQuery = e.target.textContent.toLowerCase().trim();
        filterFunctionForSearch(dataArray, divQuery, type);
      });
    });
  }

  input.addEventListener("input", (e) => {
    currentQuery = e.target.value.toLowerCase().trim();
    updateSuggestions(currentQuery);
  });

  input.addEventListener("click", () => {
    const query = input.value.toLowerCase().trim();
    if (query.length > 0) {
      currentQuery = query;
      updateSuggestions(currentQuery);
    }
  });

  searchBtn.onclick = () => {
    filterFunctionForSearch(dataArray, currentQuery, type);
  };
}

function filterFunctionForSearch(dataArray, query, type) {
  // console.log(type);
  if (type === "delivery") {
    const getData = dataArray.filter(
      (data) => data.name.trim().toLowerCase() === query
    );
    filterDetailShow(getData, type);
  } else {
    //If input is empty, show all restaurants
    if (query === "") {
      showFoodItems(restaurant, "restaurant");
    } else {
      const getData = dataArray.filter(
        (data) => data.rest_name.trim().toLowerCase() === query
      );
      filterDetailShow(getData, type);
    }
  }
  suggestionsBox.style.display = "none";
}

function filterDetailShow(getDataArray, type) {
  if (type === "delivery") {
    const getData = getDataArray[0]; //  extracting the  first match
    if (!getData) {
      detailPanel.innerHTML = `<p style="color: white; font-size: 3rem">No matching item found.</p>
    <span id="closeDetail" class="close-btn">×</span>
    `;
      detailPanel.style.display = "flex";
      attachCloseListener();
      return;
    }

    detailPanel.innerHTML = `
    <div class="detail-deli vertical-layout">
      <span id="closeDetail" class="close-btn">×</span>

      <div class="food-image">
        <img id="detailImgdeli" src="./assets/${getData.image}.png" alt="${
      getData.name
    }" />
      </div>

      <div class="item-info-deli">
        <h2>${getData.name}</h2>
        <p><strong>Category:</strong> ${getData.category}</p>
        <p><strong>Cuisine:</strong> ${getData.cuisine_type}</p>
        <p><strong>Price:</strong> ₹${getData.price}</p>
        <p><strong>Veg:</strong> ${getData.is_veg ? "Yes" : "No"}</p>
        <p><strong>Rating:</strong> ⭐ ${getData.rating}</p>
        <p><strong>Prep Time:</strong> ⏱️ ${getData.prep_time} mins</p>
      </div>

      <div class="cartControls">
        <button id="minusBtn">–</button>
        <span id="cartCount">0</span>
        <button id="plusBtn">+</button>
        <button id="addCartBtn">Add to Cart</button>
      </div>
    </div>
  `;
    detailPanel.style.display = "flex";

    attachCloseListener();
  } else {
    const getData = getDataArray; //  extracting the  first match

    if (!getData) {
      detailPanel.innerHTML = `<p style="color: white; font-size: 3rem">No matching item found.</p>
    <span id="closeDetail" class="close-btn">×</span>
    `;
      detailPanel.style.display = "flex";
      attachCloseListener();
      return;
    }
    showFoodItems(getDataArray, type);
  }
}
function attachCloseListener() {
  const closeBtn = document.getElementById("closeDetail");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      detailPanel.style.display = "none";
    });
  }
}

// Cart controls
function cartFunction() {
  const plusBtn = document.getElementById("plusBtn");
  const minusBtn = document.getElementById("minusBtn");
  const cartCount = document.getElementById("cartCount");

  if (plusBtn && minusBtn && cartCount) {
    plusBtn.addEventListener("click", () => {
      cartCount.textContent = parseInt(cartCount.textContent) + 1;
    });

    minusBtn.addEventListener("click", () => {
      const current = parseInt(cartCount.textContent);
      if (current > 0) cartCount.textContent = current - 1;
    });
  }
}
