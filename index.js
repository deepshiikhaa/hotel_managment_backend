const express = require("express")
const mongoose = require("mongoose")
const User = require("./src/models/User")

require('dotenv').config()
const { register, login, findUser  } = require("./src/Controllers/Users")
const server = express()
const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares")
const { addForm } = require("./src/Controllers/Form")

const http = require("http");
const app = http.createServer(server)
const {Server} = require ("socket.io");
const { Socket } = require("dgram")
const { sendEmail } = require("./src/Helper/Email")
const io = new Server(app);

server.use(express.json())
server.use(cors())

server.get("/", (req, res)=> {
  res.status(200).json({
    uname:"Deep",
     uphone:"88835700"
  })
})

server.post("/register",register , sendEmail)

server.post("/login",login)
server.post("/addForm",validateForm,isValidated,addForm ,sendEmail)
  
  
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

 const port = process.env.PORT

       app.listen(port,()=>{
    console.log("server started")
})

const mongodb =process.env.MONGODB_url
mongoose.connect(mongodb)
.then(data => {
     console.log("Database Connected");
})