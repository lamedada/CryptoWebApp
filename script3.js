/*To retrieve the data of Cryptocurrencies using CoinGecko's API. */
$(document).ready(function () {
    const apiKey = '4ec3cee0e4mshac3bebf570c725cp1f0774jsn5762af6f34b3';
    const cryptoList = ['bitcoin', 'ethereum', 'cardano', 'ripple', 'solana', 'binancecoin', 'polygon', 'polkadot', 'litecoin'];
    const apiUrl = 'https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&ids=' + cryptoList.join(',') + '&order=market_cap_desc&price_change_percentage=30d';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
        },
        success: function (response) {
            let tableBody = $('#crypto-table tbody');
            response.forEach(crypto => {
                const name = crypto.name;
                const price = crypto.current_price;
                const percentageChange30d = crypto.price_change_percentage_30d_in_currency;

                tableBody.append(`
                    <tr>
                        <td>${name}</td>
                        <td>$${price.toFixed(2)}</td>
                        <td>${percentageChange30d.toFixed(2)}%</td>
                    </tr>
                `);
            });
        }
    });
});