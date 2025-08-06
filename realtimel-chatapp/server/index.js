const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"],
  },
});

const PORT = 5001;

io.on("connection", (socket) => {
  console.log("クライアントと接続しました");

  socket.on("send_message", (data) => {
    console.log(data);

    io.emit("res_message" ,data)
  });

  socket.on("disconnect", () => {
    console.log("クライアントと接続が切れました");
  });
});

server.listen(PORT, () => console.log(`server is running on${PORT}`));
