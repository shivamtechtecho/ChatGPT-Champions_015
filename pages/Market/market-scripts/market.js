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
      // Overall Market insights
      // Market Cap and percentage change
      document.querySelector(
        ".head-desc-wrapper p span:first-child"
      ).textContent = `$${(
        data.quote.USD.total_market_cap / 1000000000000
      ).toFixed(2)}T`;
      const marketCapChange1 = document.querySelector(
        ".head-desc-wrapper p span:nth-child(2)"
      );
      marketCapChange1.innerHTML = `<i class="fa-solid fa-sort-${
        marketCapPercentageChange < 0 ? "down" : "up"
      }"></i> ${Math.abs(marketCapPercentageChange).toFixed(2)}%`;
      marketCapChange1.className =
        marketCapPercentageChange < 0 ? "down" : "up"; // Apply color
      const marketIncDec = document.querySelector(
        ".head-desc-wrapper p span:nth-child(3)"
      );
      marketIncDec.innerHTML =
        marketCapPercentageChange < 0 ? "decrease" : "increase";
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
  // document.getElementById("countdown").innerHTML =
  //   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the countdown is finished, display some text
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

// Animation

const view_animation = (cur_state, animate) => {
  document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the current state class
    document.querySelectorAll(`.${cur_state}`).forEach((element) => {
      // Remove the current state class and add the animation class
      element.classList.remove(`${cur_state}`);
      element.classList.add(`${animate}`);
    });
  });
};
view_animation("fade-up", "animate-fadeUp");
view_animation("vanish", "animate-appear");

// polulating the table
const apiEndpoint =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "	CG-FsyvQgVi1Nh2kTBk3HU2icLx",
  },
};

fetch(apiEndpoint, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const tableBody = document.querySelector("tbody");

    data.forEach((coin, index) => {
      // Create a new row
      const row = document.createElement("tr");
      row.style.cursor = "pointer";

      // Columns for each data point
      row.innerHTML = `
          <td><i class="fa-regular fa-star"></i></td>
          <td class="coin-rank" style="text-align: center;"><p>${
            coin.market_cap_rank
          }</p></td>
          <td class="coin-name" style="text-align: start;">
            <a style="display: flex;" href="#">
              <img class="coin-logo" src="${coin.image}" alt="${coin.name}">
              <p>${coin.name}</p>
              <p>${coin.symbol.toUpperCase()}</p>
            </a>
          </td>
          <td style="text-align: end;"><span>$${coin.current_price.toLocaleString()}</span></td>
          <td style="text-align: end;">
            <span><i class="${
              coin.price_change_percentage_1h_in_currency >= 0
                ? "fa-solid fa-sort-up"
                : "fa-solid fa-sort-down"
            }"></i> ${
        coin.price_change_percentage_1h_in_currency?.toFixed(2) || "N/A"
      }%</span>
          </td>
          <td style="text-align: end;">
            <span><i class="${
              coin.price_change_percentage_24h >= 0
                ? "fa-solid fa-sort-up"
                : "fa-solid fa-sort-down"
            }"></i> ${coin.price_change_percentage_24h.toFixed(2)}%</span>
          </td>
          <td style="text-align: end;">
            <span><i class="${
              coin.price_change_percentage_7d_in_currency >= 0
                ? "fa-solid fa-sort-up"
                : "fa-solid fa-sort-down"
            }"></i> ${
        coin.price_change_percentage_7d_in_currency?.toFixed(2) || "N/A"
      }%</span>
          </td>
          <td style="text-align: end;"><span>$${coin.market_cap.toLocaleString()}</span></td>
          <td style="text-align: end;">
            <p>$${coin.total_volume.toFixed(4).toLocaleString()}</p>
            <p>${(coin.total_volume / coin.current_price).toFixed(
              4
            )} ${coin.symbol.toUpperCase()}</p>
          </td>
          <td style="text-align: end;"><p>${coin.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}</p></td>
          <td style="text-align: end;">
            <img src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${
              coin.market_cap_rank
            }.svg" alt="${coin.name} 7d chart">
          </td>
        `;

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// COnverter logic

let conversionRate = 61374.51;

// Function to convert BTC to USD
function convertBTCtoUSD(btcValue) {
  return btcValue * conversionRate;
}

// Function to convert USD to BTC
function convertUSDtoBTC(usdValue) {
  return usdValue / conversionRate;
}

// Get input elements
const btcInput = document.getElementById("btcInput");
const usdInput = document.getElementById("usdInput");

// Prevent circular updates with a flag
let isUpdating = false;

// Event listener for BTC input change (BTC to USD)
btcInput.addEventListener("input", function () {
  if (!isUpdating) {
    let btcValue = parseFloat(btcInput.value);
    if (!isNaN(btcValue)) {
      isUpdating = true; // Set flag to avoid circular update
      usdInput.value = convertBTCtoUSD(btcValue).toFixed(2); // Convert BTC to USD
      isUpdating = false; // Unset flag after update
    } else {
      usdInput.value = ""; // Clear USD input if BTC value is invalid
    }
  }
});

// Event listener for USD input change (USD to BTC)
usdInput.addEventListener("input", function () {
  if (!isUpdating) {
    let usdValue = parseFloat(usdInput.value);
    if (!isNaN(usdValue)) {
      isUpdating = true; // Set flag to avoid circular update
      btcInput.value = convertUSDtoBTC(usdValue).toFixed(8); // Convert USD to BTC
      isUpdating = false; // Unset flag after update
    } else {
      btcInput.value = ""; // Clear BTC input if USD value is invalid
    }
  }
});

// Price Tickers
// Placeholder for previous price to compare changes
let previousPrice = 61374.51;

// Get the DOM elements
const priceElement = document.getElementById("price");
const changeElement = document.getElementById("change");

// Simulating real-time price data from WebSocket
function updatePrice(newPrice) {
  const oldPrice = previousPrice;
  previousPrice = newPrice;

  // Update price in the DOM
  priceElement.textContent = `$${newPrice.toFixed(2)}`;

  // Compare old and new prices
  if (newPrice > oldPrice) {
    priceElement.classList.add("price-up");
    priceElement.classList.remove("price-down", "price-no-change");
  } else if (newPrice < oldPrice) {
    priceElement.classList.add("price-down");
    priceElement.classList.remove("price-up", "price-no-change");
  } else {
    priceElement.classList.add("price-no-change");
    priceElement.classList.remove("price-up", "price-down");
  }

  // Reset animation class after the animation ends
  setTimeout(() => {
    priceElement.classList.remove("price-up", "price-down");
  }, 500);
}

// Example WebSocket connection (e.g., Binance WebSocket)
const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");

// Handle incoming messages from WebSocket
socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  const newPrice = parseFloat(data.c); // 'c' is the current price

  updatePrice(newPrice);
};
