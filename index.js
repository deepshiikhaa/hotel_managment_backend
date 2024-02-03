const express = require("express")
const mongoose = require("mongoose")
const User = require("./src/models/User")

require('dotenv').config()
const { register, login, findUser, updateUser  } = require("./src/Controllers/Users")
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

server.get("/get-product/:id" , (req ,res) => {
  res.send(req.params.id)
})

server.put("/update-user",verifyToken , updateUser)


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


mongoose.connect(`mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ac-kmub8ez-shard-00-00.w7plv4c.mongodb.net:27017,ac-kmub8ez-shard-00-01.w7plv4c.mongodb.net:27017,ac-kmub8ez-shard-00-02.w7plv4c.mongodb.net:27017/?ssl=true&replicaSet=atlas-xlt7wh-shard-0&authSource=admin&retryWrites=true&w=majority`)
 .then(()=>console.log('Connected to Mongoose'))
 .catch(err => console.log(err));