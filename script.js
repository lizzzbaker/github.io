// dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// fade-in
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
