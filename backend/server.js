import 'dotenv/config';

import http from 'http';
import app from './app.js';
import {Server} from 'socket.io'
import jwt from 'jsonwebtoken'

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: '*'
    }
});

io.use((socket, next) => {
    try{
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        if(!token){
            return next(new Error('Authentication Error'))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return next(new Error('Authentication Error'))
        }
        socket.user = decoded;

        next();

    }catch(err){
        next(err)
    }
})


io.on('connection', socket => {
    console.log('a user connected');

    socket.on('event', data => { 
        console.log('Received event:', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});