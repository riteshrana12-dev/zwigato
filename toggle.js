document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Listen for toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    body.classList.toggle("dark-mode", theme === "dark");
    body.classList.toggle("light-mode", theme === "light");
  }
});
