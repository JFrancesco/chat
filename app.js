const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index");
});


io.on("connection",(socket)=>{
    console.log("biri baglandi");

    socket.on("message",(message)=>{
        socket.broadcast.emit("message",message);
        socket.emit("yourmessage",message);
    });
});

server.listen(port, "0.0.0.0", () => {
    console.log("Server listening on 0.0.0.0:"+port);
});