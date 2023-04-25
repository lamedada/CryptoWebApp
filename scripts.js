/*To retrieve the Price List of Cryptocurrencies using CoinGecko's API. */
$(document).ready(function () {
    const apiKey = '4ec3cee0e4mshac3bebf570c725cp1f0774jsn5762af6f34b3';
    const cryptoList = ['bitcoin', 'ethereum', 'cardano', 'ripple', 'solana', 'binancecoin', 'polygon', 'polkadot', 'litecoin'];
    const apiUrl = 'https://coingecko.p.rapidapi.com/simple/price?ids=' + cryptoList.join(',') + '&vs_currencies=usd';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
        },
        success: function (response) {
            let tableBody = $('#crypto-table tbody');
            for (const crypto in response) {
                const name = crypto.charAt(0).toUpperCase() + crypto.slice(1);
                const symbol = crypto.slice(0, 3).toUpperCase();
                const price = response[crypto].usd;

                tableBody.append(`
                    <tr>
                        <td>${name}</td>
                        <td>${symbol}</td>
                        <td>$${price.toFixed(2)}</td>
                    </tr>
                `);
            }
        }
    });
});