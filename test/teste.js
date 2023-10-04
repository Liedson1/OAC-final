const serverURL = 'http://localhost:3000'; // Substitua pelo URL do seu servidor

function enviarDadosParaServidor() {
    const dadosDoSensor = {
        temperatura: Math.random() * 30 + 20, // Simula temperatura entre 20°C e 50°C
        umidade: Math.random() * 50 + 40,    // Simula umidade entre 40% e 90%
    };

    import('node-fetch').then((nodeFetch) => {
        const fetch = nodeFetch.default;

        fetch(serverURL + '/dados-do-wokwi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoSensor),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Resposta do servidor:', data);
            })
            .catch((error) => {
                console.error('Erro ao fazer a solicitação POST:', error);
            });
    });
}

// Chama a função para enviar dados a cada 5 segundos
setInterval(enviarDadosParaServidor, 5000);
