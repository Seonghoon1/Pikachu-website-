import express from 'express';
import { makeWASocket, useMultiFileAuthState, delay } from '@whiskeysockets/baileys';
import pino from 'pino';

const app = express();
app.use(express.static('public'));

app.get('/code', async (req, res) => {
    let num = req.query.number;
    if (!num) return res.send({ error: "Provide a number" });
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    });
    if (!sock.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(num);
        res.send({ code: code });
    }
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', async (s) => {
        if (s.connection === 'open') {
            await delay(5000);
            const session = Buffer.from(JSON.stringify(sock.authState.creds)).toString('base64');
            await sock.sendMessage(sock.user.id, { text: `PIKACHU-SESSION;;;${session}` });
            process.exit(0);
        }
    });
});

app.listen(process.env.PORT || 3000);
