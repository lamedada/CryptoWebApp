/*To retrieve the Market Cap Value from CoinGecko Website. */
const apiKey = '4ec3cee0e4mshac3bebf570c725cp1f0774jsn5762af6f34b3';
const url = `https://api.coingecko.com/api/v3/global?x-api-key=${apiKey}`;

async function fetchGlobalMarketCap() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const marketCap = data.data.total_market_cap.usd;
    const percentageChange = data.data.market_cap_change_percentage_24h_usd;

    document.getElementById('globalMarketCap').textContent =
        `The global cryptocurrency market cap today is $${formatMarketCap(marketCap)}, a ${percentageChange.toFixed(2)}% change in the last 24 hours.`;
  } catch (error) {
    console.error('Error fetching global market cap data:', error);
  }
}

fetchGlobalMarketCap();

/*To make the system recognize the value and auto format it based on its size. */
function formatMarketCap(value) {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(1) + ' Trillion';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + ' Billion';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + ' Million';
    } else {
      return value.toFixed(1);
    }
  }