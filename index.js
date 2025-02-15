const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

let qrCodeData = null; // Armazena o QR Code temporariamente

const client = new Client({
    authStrategy: new LocalAuth() // Salva a sessão localmente
});

client.on('qr', qr => {
    console.log('QR Code gerado! Acesse http://localhost:' + port + '/ para escanear.');
    qrCodeData = qr; // Armazena o QR Code gerado
});

client.on('ready', () => {
    console.log('Bot está pronto!');
});

client.on('message', async msg => {
    if (msg.body.toLowerCase() === 'oi') {
        await msg.reply('Olá! Como posso te ajudar?');
    }
});

client.initialize();

// Servir uma página HTML com a imagem do QR Code
app.get('/', (req, res) => {
    res.send(`
        <h1>Escaneie o QR Code para conectar</h1>
        ${qrCodeData ? `<img src="/qrcode" />` : '<p>Aguardando QR Code...</p>'}
    `);
});

// Rota que gera e serve o QR Code como imagem
app.get('/qrcode', async (req, res) => {
    if (!qrCodeData) {
        return res.status(400).send('QR Code ainda não gerado. Atualize a página.');
    }

    try {
        const qrCodeImage = await qrcode.toDataURL(qrCodeData);
        res.send(`<img src="${qrCodeImage}" />`);
    } catch (error) {
        res.status(500).send('Erro ao gerar QR Code.');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
