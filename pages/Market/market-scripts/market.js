function fetchData() {
  axios
    .get("https://chat-gpt-backend.vercel.app/get-coinmarket-data")
    .then(function (response) {
      const data = response.data.data.data;

      // Crypto count
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(1) a"
      ).textContent = `${(data.total_cryptocurrencies / 1000).toFixed(1)}k+`;
      // console.log(data.data.data);

      // Exchanges count
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(2) a"
      ).textContent = `${data.total_exchanges}`;

      // Market Cap and percentage change
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(3) a"
      ).textContent = `$${(
        data.quote.USD.total_market_cap / 1000000000000
      ).toFixed(2)}T`;
      const marketCapChange = document.querySelector(
        ".global-mkt-wrapper li:nth-child(3) p"
      );
      const marketCapPercentageChange =
        data.quote.USD.total_market_cap_yesterday_percentage_change;
      marketCapChange.innerHTML = `<i class="fa-solid fa-sort-${
        marketCapPercentageChange < 0 ? "down" : "up"
      }"></i> ${Math.abs(marketCapPercentageChange).toFixed(2)}%`;
      marketCapChange.className = marketCapPercentageChange < 0 ? "down" : "up"; // Apply color

      // 24th Volume and percentage change
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(4) a"
      ).textContent = `$${(
        data.quote.USD.total_volume_24h / 1000000000
      ).toFixed(2)}B`;
      const volumeChange = document.querySelector(
        ".global-mkt-wrapper li:nth-child(4) p"
      );
      const volumePercentageChange =
        data.quote.USD.total_volume_24h_yesterday_percentage_change;
      volumeChange.innerHTML = `<i class="fa-solid fa-sort-${
        volumePercentageChange < 0 ? "down" : "up"
      }"></i> ${Math.abs(volumePercentageChange).toFixed(2)}%`;
      volumeChange.className = volumePercentageChange < 0 ? "down" : "up"; // Apply color

      // Dominance (BTC and ETH)
      document.querySelector(
        "#dom-btc"
      ).textContent = `BTC: ${data.btc_dominance.toFixed(2)}%`;
      document.querySelector(
        "#dom-eth"
      ).textContent = `ETH: ${data.eth_dominance.toFixed(2)}%`;

      axios
        .get("https://api.alternative.me/fng/")
        .then((res) => {
          // Fear & Greed Index
          document.querySelector(
            ".global-mkt-wrapper li:nth-child(7) a"
          ).textContent = `${res.data.data[0].value}/100`;
        })
        .catch((err) => console.log(err));
    })
    .catch(function (error) {
      console.error("Error fetching market data:", error);
    });
}

// Initial fetch when the page loads
fetchData();

// Refresh data every 5 minutes (300,000 ms)
setInterval(fetchData, 300000); // Adjust interval as necessary
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Slide Section
function initSlider(sliderId, indicatorsId) {
  let currentSlide = 0;
  const slides = document.querySelectorAll(`#${sliderId} .slide`);
  const dots = document.querySelectorAll(`#${indicatorsId} .dot`);

  // Function to go to the specific slide
  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length; // loop back
    document.querySelector(`#${sliderId}`).style.transform = `translateX(-${
      currentSlide * 100
    }%)`;
    updateDots();
  }

  // Function to update active dot
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Auto slide every 3 seconds
  function autoSlide() {
    goToSlide(currentSlide + 1);
  }

  let sliderInterval = setInterval(autoSlide, 3000);

  // Add click event to each dot to navigate slides
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(sliderInterval); // Stop auto sliding
      goToSlide(index); // Go to clicked slide
      sliderInterval = setInterval(autoSlide, 3000); // Restart auto sliding
    });
  });
}

// Initialize both sliders
initSlider("slider1", "indicators1");
initSlider("slider2", "indicators2");

// Set the countdown target to 5 days from now
let countdownDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;

// Update the countdown every 1 second
let countdownFunction = setInterval(function () {
  // Get the current time
  let now = new Date().getTime();

  // Find the time difference between now and the countdown date
  let distance = countdownDate - now;

  // Calculate days, hours, minutes, and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the countdown element
  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the countdown is finished, display some text
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
