const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.static("public"))

let agentData = {
  heart: 0,
  steps: 0,
  calories: 0,
  location: "Unknown",
  sos: false
}

app.post("/data", (req,res)=>{
  agentData = req.body
  io.emit("update", agentData)
  res.send({status:"ok"})
})

io.on("connection",(socket)=>{
  socket.emit("update",agentData)
})

server.listen(3000,()=>{
  console.log("Agent Dashboard Running")
})