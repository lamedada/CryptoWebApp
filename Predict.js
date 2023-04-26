// Fetch historical data for the given coin and days.
async function fetchHistoricalData(coin, days) {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  const response = await fetch(url);
  const data = await response.json();
  return data.prices.map(price => price[1]);
}

// Calculate the Simple Moving Average (SMA) for the given data and window.
function calculateSMA(data, window) {
  let sma = [];
  for (let i = 0; i <= data.length - window; i++) {
    const average = data.slice(i, i + window).reduce((a, b) => a + b, 0) / window;
    sma.push(average);
  }
  return sma;
}

// Predict the future price for the given coin, days, and window.
async function predictFuturePrice(coin, days, window) {
  const historicalData = await fetchHistoricalData(coin, days);
  const sma = calculateSMA(historicalData, window);
  return sma[sma.length - 1];
}

async function displayPredictedPrices(coins) {
  const tbody = document.getElementById('crypto-tables').getElementsByTagName('tbody')[0];

  for (const coin of coins) {
    try {
      const coinData = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
      const coinJson = await coinData.json();
      const name = coinJson.name;
      const priceUSD = coinJson.market_data.current_price.usd;
      const percentageChange30d = coinJson.market_data.price_change_percentage_30d_in_currency.usd;

      const predictedPrice = await predictFuturePrice(coin, 30, 7);

      const row = tbody.insertRow();
      row.insertCell().textContent = name;
      row.insertCell().textContent = `$${priceUSD.toFixed(2)}`;
      row.insertCell().textContent = `${percentageChange30d.toFixed(2)}%`;
      row.insertCell().textContent = `$${predictedPrice.toFixed(2)}`;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Attach the function to the window's load event
window.addEventListener('load', () => displayPredictedPrices(['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'cardano', 'solana', 'polkadot', 'litecoin']));

