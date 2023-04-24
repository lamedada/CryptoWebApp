const API_KEY = 'your-api-key';
const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

async function fetchTopCryptos() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching data');
        }

        const data = await response.json();
        displayCryptos(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayCryptos(cryptos) {
    const tableBody = document.getElementById('crypto-table-body');

    cryptos.forEach((crypto, index) => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = crypto.name;
        row.appendChild(nameCell);

        const symbolCell = document.createElement('td');
        symbolCell.textContent = crypto.symbol.toUpperCase();
        row.appendChild(symbolCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = '$' + crypto.current_price.toFixed(2);
        row.appendChild(priceCell);

        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = '$' + crypto.market_cap.toLocaleString
        tableBody.appendChild(row);
        }   
    );
}
