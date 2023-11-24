const express = require('express')
const app =express();
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes);

const http = require('http').createServer(app)
const socketio = require('socket.io')
const io = socketio(http)
const dotenv = require('dotenv')

const { addUser, removeUser, getUser } = require('./helper')
const Room = require('./models/Room')
const Message = require('./models/Message')

const PORT = process.env.PORT || 5000

//connect to db
require('./config/db')
dotenv.config();

app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'Tony')
    res.cookie('isAithenticated', true, { maxAge:24*60*30*1000 })
    res.send('cookies are set')
})

app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})

io.on('connection', (socket) => {
    //console.log(socket.id)

    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })

    socket.on('create-room', name => {
        //console.log('Then room name received is ', name)
        const room = new Room({name})
        room.save().then(result => {
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {
        console.log(`User ${name} is trying to join room ${room_id}`);
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        });
        socket.join(room_id)
        if (error) {
            console.log('join error', error);
        } else {
            console.log('join user', user);
        }
    });
    socket.on('sendMessage', (message, room_id, callback) => {
        const user = getUser(socket.id, room_id);

        if (!user || !user.name) {
            console.error("Invalid user or user.name is undefined");
            return;
        }

        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id,
            text: message
        };
    
        console.log('message', msgToStore)
        const msg = new Message(msgToStore)
        msg.save().then(result => {
            io.to(room_id).emit('message', result)
            callback()
        })
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
})

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})