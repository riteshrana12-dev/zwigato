// This script checks for a saved theme in localStorage and applies it on page load.
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  // If the saved theme is 'dark', add the 'dark-mode' class to the body.
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
