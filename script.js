// Simulando leituras de temperatura e umidade em tempo real
function getTemperatureAndHumidity() {
    // Substitua este código pela lógica de obtenção de dados reais
    const temperature = Math.random() * 30 + 10; // Simulação de temperatura entre 10°C e 40°C
    const humidity = Math.random() * 40 + 40; // Simulação de umidade entre 40% e 80%
    return { temperature, humidity };
}

const temperatureElement = document.getElementById('temperature');
const celsiusElement = document.getElementById('celsius'); // Elemento para exibir temperatura com "°C"
const humidityElement = document.getElementById('humidity');

function updateData() {
    const { temperature, humidity } = getTemperatureAndHumidity();

    // Atualize a temperatura no formato "XX°C"
    celsiusElement.textContent = temperature.toFixed(2) + '°C';

    // Atualize a temperatura sem o nome "Temperatura"
    temperatureElement.textContent = temperature.toFixed(2);

    // Atualize a umidade com dois dígitos após a vírgula
    humidityElement.textContent = humidity.toFixed(2);
}

// Atualize os dados a cada 5 segundos (5000 ms)
setInterval(updateData, 5000);

// Configuração do gráfico usando a biblioteca Chart.js
const ctx = document.getElementById('chart').getContext('2d');
const data = {
    labels: [],
    datasets: [
        {
            label: 'Temperatura (°C)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
        },
        {
            label: 'Umidade (%)',
            borderColor: 'rgb(54, 162, 235)',
            data: [],
        },
    ],
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                beginAtZero: true,
            },
        },
    },
};

const myChart = new Chart(ctx, config);

// Adicione dados ao gráfico
function addDataToChart() {
    const { temperature, humidity } = getTemperatureAndHumidity();
    const timestamp = new Date().toLocaleTimeString();

    data.labels.push(timestamp);
    data.datasets[0].data.push(temperature);
    data.datasets[1].data.push(humidity);

    // Limite o gráfico a um número máximo de pontos (por exemplo, 10)
    if (data.labels.length > 10) {
        data.labels.shift();
        data.datasets[0].data.shift();
        data.datasets[1].data.shift();
    }

    myChart.update();
}

// Adicione dados ao gráfico a cada 10 segundos (10000 ms)
setInterval(addDataToChart, 10000);
