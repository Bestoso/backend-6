require('dotenv').config();
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', require('./router/app.router'));

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('getProducts', data => {
        console.log(data)
        socketServer.emit('liveProducts', data);
    });
});

