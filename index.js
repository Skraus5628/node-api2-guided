const express = require("express")
const hubs = require("./hubs/hubs-model")
const welcomeRouter =require("./welcome/welcome-router")
const hubsRouter = require("./hubs/hubs-router")

const server = express()
const port = 4000

server.use(express.json())
server.use("/", welcomeRouter)
server.use("/api/hubs", hubsRouter)


// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
