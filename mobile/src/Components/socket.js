import { io } from "socket.io-client";
import { SOCKET_URL } from '../constants/index'
const socket = io(SOCKET_URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log(event, args);
});

socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
        console.log('invalid username')
    }
});

export default socket;