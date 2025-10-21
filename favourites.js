// const foodToggle = document.getElementById("foodToggle");
// const restaurantToggle = document.getElementById("restaurantToggle");
// const favouritesSection = document.querySelector(".showFood");

// let currentView = "food";

// // Toggle buttons
// foodToggle.addEventListener("click", () => {
//   currentView = "food";
//   foodToggle.classList.add("active");
//   restaurantToggle.classList.remove("active");
//   renderFavourites();
// });

// restaurantToggle.addEventListener("click", () => {
//   currentView = "restaurant";
//   restaurantToggle.classList.add("active");
//   foodToggle.classList.remove("active");
//   renderFavourites();
// });

// // Get favourites from localStorage
// function getFavouritesFromStorage() {
//   const allFavourites = JSON.parse(localStorage.getItem("favourites")) || {};
//   const food = [];
//   const restaurant = [];

//   Object.values(allFavourites).forEach((item) => {
//     if (item.type === "delivery") {
//       food.push(item);
//     } else if (item.type === "restaurant") {
//       restaurant.push(item);
//     }
//   });

//   return { food, restaurant };
// }

// // Render favourites
// function renderFavourites() {
//   favouritesSection.innerHTML = "";

//   const favourites = getFavouritesFromStorage();
//   const itemsToRender = favourites[currentView];

//   if (itemsToRender.length === 0) {
//     favouritesSection.innerHTML = `<p class="empty-msg">No favourites yet in ${currentView}!</p>`;
//     return;
//   }

//   itemsToRender.forEach((item, index) => {
//     let html = "";

//     if (currentView === "food") {
//       html = `
//       <div class="deliveryDetail"
//            data-index="${index}"
//            data-id="${item.id}"
//            data-name="${item.title}"
//            data-price="${item.price}"
//            data-image="${item.img}">
//         <div class="deliveryImg">
//           <img src="${item.img}" alt="${item.title}" loading="lazy"/>
//         </div>
//         <div class="deliveryDescription">
//           <div class="deliveryAllDetail">
//             <span class="name">${item.title}</span>
//             <span class="heart-icon active" data-index="${index}"></span>
//           </div>
//           <div class="deliveryAllDetail">
//             <p class="price">₹${item.price}</p>
//             <p class="ratings">★ ${item.rating}</p>
//           </div>
//           <div class="deliveryAllDetail">
//             <p class="time">⏱️ ${item.prepTime} min</p>
//           </div>
//         </div>
//       </div>`;
//     }

//     if (currentView === "restaurant") {
//       html = `
//       <div class="restaurantsDetail"
//            data-index="${index}"
//            data-id="${item.id}">
//         <div class="restaurantsImg">
//           <img src="${item.img}" alt="${item.title}" loading="lazy"/>
//         </div>
//         <div class="restaurantsDescription">
//           <div class="restaurantsAllDetail">
//             <p class="name">${item.title}</p>
//             <p class="ratings">${
//               item.rating
//             } <span class="star-icon">★</span></p>
//             <span class="heart-icon active" data-index="${index}"></span>
//           </div>
//           <div class="restaurantsAllDetail">
//             <p class="food_type">${item.foodTypes.slice(0, 2).join(" , ")}${
//         item.foodTypes.length > 2 ? "..." : ""
//       }</p>
//             <p class="two_price">price-of-two: ₹${item.price}</p>
//           </div>
//           <div class="restaurantsAllDetail">
//             <p class="location">${item.location}</p>
//           </div>
//           <div class="restaurantsAllDetail">
//             <p class="time">Time: ${item.open}-${item.close}</p>
//           </div>
//         </div>
//       </div>`;
//     }

//     favouritesSection.insertAdjacentHTML("beforeend", html);
//   });

//   // ✅ Rebind heart icons only
//   const allCards = document.querySelectorAll(
//     currentView === "food" ? ".deliveryDetail" : ".restaurantsDetail"
//   );

//   favouritescards(
//     allCards,
//     itemsToRender,
//     currentView === "food" ? "delivery" : "restaurant"
//   );
// }

// // Initial render
// renderFavourites();
