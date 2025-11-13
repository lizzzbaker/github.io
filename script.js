// dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
