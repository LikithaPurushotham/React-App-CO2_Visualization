const io = require("socket.io")({
  cors: {
    origin: ["http://localhost:3000"],
  },
});
//listen for socket connection
io.on("connection", (socket) => {
  console.log(socket.id);
});

io.listen(3001);
//To Generate a random number every 10sec and push to frontend
setInterval(() => {
  const value = Math.floor(Math.random() * (5000 - 350 + 1) + 350);
  io.emit("value", value);
}, 10000);
