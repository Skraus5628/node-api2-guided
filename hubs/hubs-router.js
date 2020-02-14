const express = require("express")
const hubs = require("./hubs-model")

const router = express.Router()

// this handles the route /api/hubs
router.get("/", (req, res) => {
	// console.log(req.query)
	const opts={
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}
	// /localhost:4000/api/hubs?sortBy=name&limit=5
	hubs.find(opts)
		.then((hubs) => {
			res.status(200).json(hubs)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the hubs",
			})
		})
})

// if we go to  /api/hubs/someValue, what should "somevalue" be used for?

// query strings example:  /hubs?sortBy=name&foo=bar
// this is better than /hubs/:sortBy or /hubs/sortBy/:value

// this handles /api/hubs/:id
router.get("/:id", (req, res) => {
	hubs.findById(req.params.id)
		.then((hub) => {
			if (hub) {
				res.status(200).json(hub)
			} else {
				res.status(404).json({
					message: "Hub not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the hub",
			})
		})
})

//handles /api/hubs POST 
router.post("/", (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: "Missing hub name",
		})
	}

	hubs.add(req.body)
		.then((hub) => {
			res.status(201).json(hub)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the hub",
			})
		})
})

router.put("/:id", (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: "Missing hub name",
		})
	}

	hubs.update(req.params.id, req.body)
		.then((hub) => {
			if (hub) {
				res.status(200).json(hub)
			} else {
				res.status(404).json({
					message: "The hub could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the hub",
			})
		})
})


router.delete("/:id", (req, res) => {
	hubs.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The hub has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The hub could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the hub",
			})
		})
})

// a route for listing out a hub's messages
// this handles GET /api/hubs/:id/messages
router.get("/:id/messages", (req, res) =>{
    hubs.findHubMessages(req.params.id)
        .then((messages) =>{
            res.status(200).json(messages)
            // or just res.json(messages) since express defaults to a 200
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "could not get the hub messages",
            })

        })
})

// get a specific message by id
// this handles GET /api/hubs/:id/messages/:messageID
router.get("/:hubId/messages/:messageId", (req, res) =>{
    hubs.findHubMessageById(req.params.hubId, req.params.messageId)
        .then((message) =>{
            if (message) {
                res.json(message)
            } else {
                res.status(404).json({
                    message: "Message was not found",
                })
            }
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "could not get the hub message",
            })

        })
})

// endpoint for creating hub message
// this handles POST /api/hubs/:id/messages
router.post("/:id/messages", (req, res) =>{
    const { sender, text } = req.body
    if (!sender || !text) {
        return res.status(400).json({
            message: "Need sender and text values",
        })
    }
    
    hubs.addHubMessage(req.params.id, req.body)
        .then((newMessage) =>{
            res.status(201).json(newMessage)
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "could not create hub messages",
            })

        })
})


module.exports = router