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
