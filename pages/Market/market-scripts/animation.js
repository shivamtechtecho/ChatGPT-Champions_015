// // Function to make elements visible with animation
// function revealElements() {
//   const coinNameElement = document.querySelector(".btc-converter");
//   const coinPriceElement = document.querySelector(".coin-mainprice");

//   // Add 'visible' class after a short delay for the loading effect
//   setTimeout(() => {
//     coinNameElement.classList.remove("hidden");
//     coinNameElement.classList.add("visible");
//   }, 200); // Delay for a smooth loading effect

//   setTimeout(() => {
//     coinPriceElement.classList.remove("hidden");
//     coinPriceElement.classList.add("visible");
//   }, 400); // Delay for a smooth loading effect
// }

// // Function to handle scroll events
// function handleScroll() {
//   const coinNameElement = document.getElementById("grid-coin-name");
//   const coinPriceElement = document.querySelector(".coin-mainprice");

//   const scrollPosition = window.scrollY || window.pageYOffset;

//   // Check if the user scrolled up or down
//   if (scrollPosition > 50) {
//     // Adjust this value for sensitivity
//     coinNameElement.classList.remove("visible");
//     coinNameElement.classList.add("hidden");

//     coinPriceElement.classList.remove("visible");
//     coinPriceElement.classList.add("hidden");
//   } else {
//     coinNameElement.classList.remove("hidden");
//     coinNameElement.classList.add("visible");

//     coinPriceElement.classList.remove("hidden");
//     coinPriceElement.classList.add("visible");
//   }
// }

// // Event listeners for load and scroll
// window.addEventListener("load", revealElements);
// window.addEventListener("scroll", handleScroll);
function addScrollAnimation(selector) {
  const elements = document.querySelectorAll(selector);

  const observerOptions = {
    root: null, // null means it observes relative to the viewport
    rootMargin: "0px", // Add margin if you want to trigger earlier
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally, unobserve the element after it becomes visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Usage example
document.addEventListener("DOMContentLoaded", function () {
  addScrollAnimation(".btc-converter");
  addScrollAnimation(".coin-wrap");
  addScrollAnimation(".coin-mainprice1");
  addScrollAnimation(".coin-mainprice");
  addScrollAnimation(".links-toggles");
  addScrollAnimation(".low-high");
  addScrollAnimation(".navbar");
  addScrollAnimation(".content");
});
