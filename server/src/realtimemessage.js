const httpServer = require("http").createServer();
require('dotenv').config({ path: './src/config/.env' });
const MessageModel = require("./models/message_model");
const socket_middeleware = require("./middlewares/socket_middelewares");
const message_model = new MessageModel();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
}
);

io.use(socket_middeleware);


function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}




io.on("connection", (socket) => {
    console.log("hey")
    const users = new Map();
    console.log("----**********-----*****-----****---******----");

    for (let [id, socket] of io.of("/").sockets) {
        if (users.get(socket.username)) {
            users.get(socket.username).push(id);
        } else {
            users.set(socket.username, [id]);
        }
    }

    console.log("user", JSON.stringify(users, replacer));
    socket.emit("users", JSON.stringify(users, replacer));
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
    });
    socket.emit("session", {
        sessionID: socket.sessionID,
        userID: socket.userID,
    });

    socket.on("private message", ({ content, to, to_username }) => {
        message_model.insert_new_message({ data:content, from: socket.handshake.auth.username, to: to_username });
        if (to.length != 0)
            for (let id of to) {
                socket.to(id).emit("private message", {
                    content,
                    from: socket.handshake.auth.username
                })
            }
            socket.emit("private message", {})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', { id: socket.id, username: socket.username });
    })
});

module.exports = httpServer;


