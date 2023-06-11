import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import * as usersController from './controllers/users';
import bodyParser from 'body-parser';
import auth from './middlewares/auth';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("API is working");
});

app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);

app.get('/api/user', auth, usersController.currentUser);


io.on('connection', () => {
    console.log('socket.io is connected!');
});

mongoose.connect('mongodb://localhost:27017/trello').then(() => {
    console.log('connected to mongodb');

    httpServer.listen(4005, () => {
        console.log(`API is listening on port 4005`);
    })
});

