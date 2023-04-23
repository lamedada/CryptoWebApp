
//Retrieving prices from Source
async function fetchHistoricalData(coin, days) {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
    const response = await fetch(url);
    const data = await response.json();
    return data.prices.map(price => price[1]);
  }


//Calculate Simple Moving Average (SMA) of Crypto Coin
function calculateSMA(data, window) {
    let sma = [];
    for (let i = 0; i <= data.length - window; i++) {
      const average = data.slice(i, i + window).reduce((a, b) => a + b, 0) / window;
      sma.push(average);
    }
    return sma;
  }

//Actual algorithm to calculate a predictive price of Crypto Coin
async function predictFuturePrice(coin, days, window) {
    const historicalData = await fetchHistoricalData(coin, days);
    const sma = calculateSMA(historicalData, window);
    return sma[sma.length - 1];
  }

  //To display Predicted Price
  function displayPredictedPrice() {
    predictFuturePrice('cardano', 30, 7)
      .then(price => {
        const priceElement = document.getElementById('price-prediction');
        priceElement.textContent = 'Indicative Predicted price of Cryptocurrency: ' + price.toFixed(2); //2 decimal place
      })
      .catch(error => console.error('Error:', error));
  }
  
  //Attach the function to the window's load event
  window.addEventListener('load', displayPredictedPrice);
  