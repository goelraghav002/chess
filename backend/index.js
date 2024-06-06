import { WebSocketServer } from 'ws';

import { GameManager } from './src/GameManager.js';

const PORT = process.env.PORT || 8000;

const wss = new WebSocketServer({ port: PORT });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on('disconnect', () => gameManager.removeUser(ws));
});