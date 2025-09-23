// const fs = require("fs");
//for restaurant
const image = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h7",
  "h8",
  "h9",
  "h10",
  "h11",
  "h12",
  "h13",
  "h14",
  "h15",
  "h16",
  "h17",
  "h18",
  "h19",
  "h20",
];
const restaurantNames = [
  "The Royal Spoon",
  "Spice Symphony",
  "Urban Tandoor",
  "Bella Italia",
  "Sushi Zen",
  "Curry & Co.",
  "The Green Bowl",
  "Flame & Grill",
  "Masala Junction",
  "The Continental",
  "Tandoori Nights",
  "Zen Garden",
  "Bombay Biryani Hub",
  "The Kebab Factory",
  "Café de Paris",
  "The Breakfast Club",
  "Dosa District",
  "Grill House",
  "The Spice Route",
  "Café Nirvana",
];
const foodTypes = [
  "Indian",
  "Chinese",
  "Italian",
  "Japanese",
  "Thai",
  "Mexican",
  "American",
  "French",
  "Mediterranean",
  "Korean",
  "Vietnamese",
  "Lebanese",
  "South Indian",
  "North Indian",
  "Mughlai",
  "BBQ",
  "Seafood",
  "Vegan",
  "Fusion",
  "Continental",
];
const mumbaiLocations = [
  "Andheri",
  "Bandra",
  "Borivali",
  "Colaba",
  "Dadar",
  "Goregaon",
  "Juhu",
  "Kurla",
  "Malad",
  "Matunga",
  "Powai",
  "Santacruz",
  "Sion",
  "Vile Parle",
  "Vasai",
  "Versova",
  "Chembur",
  "Worli",
  "Marine Lines",
  "Churchgate",
];
const filterIdsOfRestaurants = [
  "cuisineFilterRest",
  "locationFilterRest",
  "alcoholFilterRest",
  "priceFilterRest",
  "distanceFilterRest",
];
//for delivery
const filterIdsOfDelivery = [
  "cuisineFilterDeli",
  "categoryFilterDeli",
  "vegFilterDeli",
  "ratingFilterDeli",
  "priceFilterDeli",
];
const foodNames = [
  "Butter Chicken",
  "Paneer Butter Masala",
  "Veg Biryani",
  "Chicken Biryani",
  "Pasta Alfredo",
  "Paneer Tikka",
  "Chowmein",
  "Rogan Josh",
  "Masala Dosa",
  "Shahi Paneer",
  "Vada Pav",
  "Fish Curry",
  "Rajma Chawal",
  "Fried Rice",
  "Pizza Margherita",
  "Lassi",
  "Cappuccino",
  "Masala Chai",
  "Sweet Lassi",
  "Spring Rolls",
  "Garlic Bread",
  "Burger",
  "Cold Coffee",
  "Fresh Juice",
  "Pasta Arrabiata",
  "Mocktail Virgin Mojito",
  "Latte",
  "Ice Cream Sundae",
  "French Fries",
  "Taco",
  "Sandwich",
  "Pav Bhaji",
  "Hot Dog",
  "Noodles",
  "Momos",
  "Nachos",
  "Cheese Balls",
  "Soft Drink Coke",
  "Soft Drink Pepsi",
  "Soft Drink Sprite",
  "Soft Drink Fanta",
  "Soft Drink Thums Up",
  "Soft Drink Limca",
  "Soft Drink Mountain Dew",
  "Soft Drink 7Up",
  "Cold Mojito",
  "Cold Blue Lagoon",
  "Chocolate Shake",
];
const cuisineTypes = [
  "North Indian",
  "Hyderabadi",
  "Italian",
  "Punjabi",
  "Chinese",
  "Kashmiri",
  "South Indian",
  "Mughlai",
  "Mumbai Street",
  "Goan",
  "Delhi Street",
  "Indian",
  "Cafe",
  "Asian",
  "American",
  "Fresh",
  "European",
  "Mocktail",
  "Natural",
  "Fast Food",
  "Soft Drink",
  "Shake",
];
const categories = ["Main Course", "Drink", "Fast Food", "Cold Drink"];
const isVeg = ["yes", "No"];
const ratings = [3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];

//creating dumpy data of restaurants

// for (let i = 0; i < 100; i++) {
//   const obj = {};
//   obj["image"] = image[Math.floor(Math.random() * image.length)];
//   obj["rest_name"] =
//     restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
//   obj["food_type"] = foodTypes[Math.floor(Math.random() * foodTypes.length)];
//   obj["price_for_two"] = Math.floor(Math.random() * 2401 + 100);
//   obj["location"] =
//     mumbaiLocations[Math.floor(Math.random() * mumbaiLocations.length)];
//   obj["distance_from_customer_house"] = `${(Math.random() * 30).toFixed(2)} km`;
//   obj["alcohol"] = Math.random() < 0.7 ? "Yes" : "No";
//   obj["restaurant_open_time"] = `${Math.floor(Math.random() * 4 + 8)}:00 AM`; // 8–11 AM
//   obj["restaurant_close_time"] = `${Math.floor(
//     Math.random() * 4 + 9 + 12
//   )}:00 PM`; // 9 PM–12 AM

//   restaurant.push(obj);
// }
// Convert to JSON string
// const jsonData = JSON.stringify(restaurant, null, 2);

// // Write to file
// fs.writeFileSync("restaurants.json", jsonData);

// console.log("✅ restaurants.json file created successfully!");
