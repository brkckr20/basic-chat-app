const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

const server = app.listen(4000, () => console.log("4000. port started"));

let io = socket(server);

io.on("connection", function (socket) {
    socket.on("chat", function (data) {
        /* tüm kullanıcılara gönderme - mesajı gönderen de dahil */
        io.sockets.emit('chat', data)
    })

    socket.on("yaziyor", function (data) {
        /* mesajı gönderen hariç */
        socket.broadcast.emit("yaziyor", data);
    })
})

