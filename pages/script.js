<script>
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
const params = '?vs_currency=usd&ids=shiba-inu';
let priceData = [];

async function getPriceData() {
    const response = await fetch(apiUrl + params);
    const data = await response.json();
    return data[0].current_price;
}

const ctx = document.getElementById('shibGraph').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'SHIB Price (USD)',
            data: [],
            borderColor: '#4CAF50',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                }
            },
            y: {
                beginAtZero: false
            }
        }
    }
});

async function updateChart() {
    const price = await getPriceData();
    const now = new Date();
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(price);

    if (chart.data.labels.length > 50) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.update();
}

setInterval(updateChart, 10000);
</script>
