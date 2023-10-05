const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketIO(server, { cors: { origin: '*' } });

// Array para armazenar os dados do sensor


io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Inicie o envio de dados para este cliente assim que ele se conectar
    const interval = setInterval(() => {
    }, 5000); // Envia dados a cada 5 segundos

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
        clearInterval(interval); // Limpa o intervalo quando o cliente se desconectar
    });
});


app.use(express.static(__dirname))
app.get('/', (req, res) => {
    // Use o módulo path para construir o caminho absoluto até o arquivo
    const indexPath = path.join(__dirname, 'index.html');

    // Envie o arquivo como resposta
    res.sendFile(indexPath);
});

// Rota para receber dados do Wokwi por meio de uma solicitação POST
app.post('/dados-do-wokwi', (req, res) => {
    const { temperatura, umidade } = req.body;
    io.emit('dados-sensor', { temperatura, umidade });
    console.log('Dados recebidos do Wokwi - Temperatura:', temperatura, 'Umidade:', umidade);
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
});


server.listen(PORT, () => {
    console.log(`Servidor Socket.IO está ouvindo na porta ${PORT}`);
});

