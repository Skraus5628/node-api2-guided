const express = require("express")
const hubs = require("./hubs/hubs-model")
const hubsRouter = require("./hubs/hubs-router")

const server = express()
const port = 4000

server.use(express.json())
server.use("/api/hubs", hubsRouter)

server.get("/", (req, res) => {
	res.send(`
		<h1>Lambda Hubs API</h1>
		<p>Welcome to the Lambda Hubs API</p>
	`)
})

server.get("/api", (req, res) => {
	res.json({
		message: "Welcome to the Hubs API",
	})
})











// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
