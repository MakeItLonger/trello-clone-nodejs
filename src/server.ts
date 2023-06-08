import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.send("API is working");
});

io.on('connection', () => {
    console.log('socket.io is connected!');
});

mongoose.connect('mongodb://localhost:27017/trello').then(() => {
    console.log('connected to mongodb');

    httpServer.listen(4005, () => {
        console.log(`API is listening on port 4001`);
    })
});

