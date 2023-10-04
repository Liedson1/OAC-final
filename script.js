const { io } = require('socket.io-client');


const socket = io();

const $tempC = document.querySelector('.temp-c');
const $humidity = document.querySelector('.hum');



let tempChartCtx = document.getElementById('temp-chart').getContext('2d');
let tempChart = new Chart(tempChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: [],
                borderColor: '#38bdf8',
                backgroundColor: '#38bdf8',
            },
        ],
    },
    options: {
        responsive: true,
        aspectRatio: 16 / 9,
        scales: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});

let humChartCtx = document.getElementById('hum-chart').getContext('2d');
let humChart = new Chart(humChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Umidade (%)',
                data: [],
                borderColor: '#2dd4bf',
                backgroundColor: '#2dd4bf',
            },
        ],
    },
    options: {
        responsive: true,
        aspectRatio: 16 / 9,
        scales: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});

socket.on('connect', () => {
    console.log(`Conectado ao servidor Socket.IO`);

    socket.on('dados-sensor', (data) => {
        const { temperatura, umidade } = data;
        $tempC.innerHTML = temperatura.toFixed(1);

        $humidity.innerHTML = umidade;

        const moment = new Date().toLocaleTimeString();
        tempChart.data.labels.push(moment);
        humChart.data.labels.push(moment);

        tempChart.data.datasets[0].data.push(temperatura);
        humChart.data.datasets[0].data.push(umidade);

        tempChart.update();
        humChart.update();
    });
});

socket.on('disconnect', () => {
    console.log(`Desconectado do servidor Socket.IO`);
});
