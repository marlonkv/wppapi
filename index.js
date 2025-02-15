const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('Escaneie este código QR no WhatsApp Web:', qr);
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
