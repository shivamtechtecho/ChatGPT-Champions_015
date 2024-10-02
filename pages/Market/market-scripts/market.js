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
