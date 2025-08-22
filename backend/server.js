const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // É uma boa prática permitir várias origens, especialmente se o Vite usar uma porta diferente
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`Novo usuário conectado: ${socket.id}`);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`Usuário ${socket.id} entrou na sala: ${room}`);
    });

    socket.on("sendMessage", (data) => {
        // Retransmite o objeto de dados completo para todos na sala, exceto para o remetente original
        socket.to(data.room).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

const serverPort = 3001;
server.listen(serverPort, () => {
    console.log(`Servidor rodando na porta ${serverPort}`);
});