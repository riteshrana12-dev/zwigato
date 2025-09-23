// const restaurantNamesExtended = [
//   "The Royal Spoon",
//   "Spice Symphony",
//   "Urban Tandoor",
//   "Bella Italia",
//   "Sushi Zen",
//   "Curry & Co.",
//   "The Green Bowl",
//   "Flame & Grill",
//   "Masala Junction",
//   "The Continental",
//   "Tandoori Nights",
//   "Zen Garden",
//   "Bombay Biryani Hub",
//   "The Kebab Factory",
//   "Café de Paris",
//   "The Breakfast Club",
//   "Dosa District",
//   "Grill House",
//   "The Spice Route",
//   "Café Nirvana",
//   "Golden Curry",
//   "Ocean's Delight",
//   "Spice Harbor",
//   "Midnight Diner",
//   "Saffron Lounge",
//   "Urban Bistro",
//   "The Ivy Leaf",
//   "Blue Lagoon",
//   "Rustic Table",
//   "Celestial Bites",
// ];

// const foodTypes = [
//   "Indian",
//   "Chinese",
//   "Italian",
//   "Japanese",
//   "Thai",
//   "Mexican",
//   "American",
//   "French",
//   "Mediterranean",
//   "Korean",
//   "Vietnamese",
//   "Lebanese",
//   "South Indian",
//   "North Indian",
//   "Mughlai",
//   "BBQ",
//   "Seafood",
//   "Vegan",
//   "Fusion",
//   "Continental",
// ];

// const mumbaiLocations = [
//   "Andheri",
//   "Bandra",
//   "Borivali",
//   "Colaba",
//   "Dadar",
//   "Goregaon",
//   "Juhu",
//   "Kurla",
//   "Malad",
//   "Matunga",
//   "Powai",
//   "Santacruz",
//   "Sion",
//   "Vile Parle",
//   "Vasai",
//   "Versova",
//   "Chembur",
//   "Worli",
//   "Marine Lines",
//   "Churchgate",
// ];

// const images = [
//   "h1",
//   "h2",
//   "h3",
//   "h4",
//   "h5",
//   "h6",
//   "h7",
//   "h8",
//   "h9",
//   "h10",
//   "h11",
//   "h12",
//   "h13",
//   "h14",
//   "h15",
//   "h16",
//   "h17",
//   "h18",
//   "h19",
//   "h20",
// ];

// // Utility for random integer
// function randInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Utility for cycling through an array
// function cycle(array, index) {
//   return array[index % array.length];
// }

// const restaurants = [];

// for (let i = 0; i < 100; i++) {
//   // Name, location, image cycle
//   const rest_name = cycle(restaurantNamesExtended, i);
//   const location = cycle(mumbaiLocations, i);
//   const image = cycle(images, i);

//   // Price distribution: batches approx 30 low, 40 mid, 30 high
//   let price_for_two;
//   if (i < 30) price_for_two = randInt(200, 900);
//   else if (i < 70) price_for_two = randInt(901, 2000);
//   else price_for_two = randInt(2001, 3000);

//   // Alcohol split approx 50/50
//   let alcohol = i % 2 === 0 ? "Yes" : "No";

//   // Random 4 distinct food types per restaurant
//   let fStart = (i * 4) % foodTypes.length;
//   let food_type = [];
//   for (let j = 0; j < 4; j++) {
//     food_type.push(foodTypes[(fStart + j) % foodTypes.length]);
//   }

//   // Distance random between 1 to 30 km with 2 decimals
//   let distance_from_customer_house =
//     (Math.random() * 29 + 1).toFixed(2) + " km";

//   // Opening between 7 AM and 11 AM (24 hr as integer), close 9 to 13 hours after open
//   let openHour = randInt(7, 11);
//   let closeHour = openHour + randInt(9, 13);
//   // Format 12h time w/ AM/PM
//   function to12h(hour) {
//     let suffix = hour >= 12 ? "PM" : "AM";
//     let h = hour % 12;
//     if (h === 0) h = 12;
//     return `${h}:00 ${suffix}`;
//   }
//   let restaurant_open_time = to12h(openHour);
//   let restaurant_close_time = to12h(closeHour);

//   restaurants.push({
//     image,
//     rest_name,
//     food_type,
//     price_for_two,
//     location,
//     distance_from_customer_house,
//     alcohol,
//     restaurant_open_time,
//     restaurant_close_time,
//   });
// }

// // Output the complete array
// console.log(restaurants);
