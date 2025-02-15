const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express(); // Adicionando a instância do Express

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth() // Salva a sessão localmente
});

client.on('qr', qr => {
    console.log('Escaneie o QR Code abaixo:');
    qrcode.generate(qr, { small: true });
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
