const express = require("express")
const mongoose = require("mongoose")
const User = require("./src/models/User")
const { register, login, findUser } = require("./src/Controllers/Users")
const server = express()
const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares")
const { addForm } = require("./src/Controllers/Form")

const http = require("http");
const app = http.createServer(server)
const {Server} = require ("socket.io");
const { Socket } = require("dgram")
const io = new Server(app);

server.use(express.json())
server.use(cors())

server.get("/", (req, res)=> {
  res.status(200).json({
    uname:"Deep",
     uphone:"88835700"
  })
})

server.post("/register",register)

server.post("/login",login)
server.post("/addForm",validateForm,isValidated,addForm)
  
  
server.get("/get-user",verifyToken,findUser)


io.on("connection",Socket=>{
  console.log ("new user connected");
  Socket.on("message",(message,room)=>{
    console.log ( `new message recived in ${room}and message is ${message}`);
    Socket.to(room).emit("message",message)
  })

  Socket.on("join",(room)=>{
    console.log(room)
   Socket.join(room)
   Socket.emit("joined")
  })
})



       app.listen("3000",()=>{
    console.log("server started")
})

mongoose.connect("mongodb://localhost:27017/test")
.then(data => {
     console.log("Database Connected");
})