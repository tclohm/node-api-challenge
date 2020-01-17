const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

// CREATE ACTION for project
router.post("/", (req, res) => {
	const { text, notes } = req.body;
	if(text && notes) {
		Actions.insert(req.body)
				.then(action => {
					if (action) {
						res.status(201)
							.json(action);
					} else {
						res.status(404)
							.json({ message: "The project does not exist. Couldn't find project_id" });
					}
				})
				.catch(err => {
					res.status(500)
						.json({ message: "Error posting new action to project" });
				})
	} else {
		res.status(400)
			.json({ message: "Please provide text and notes for the action" });
	}
});

// READ
// THIS HAPPENS IN `projectRouter` using .getProjectActions()
router.get("/:id", (req, res) => {
	Actions.get(req.params.id)
			.then(action => {
				if (action) {
					res.status(200)
						.json(action);
				} else {
					res.status(404)
						.json({ message: "The specified ID does not exist" });
				}
			})
			.catch(err => {
				console.log(err)
				res.status(500)
					.json({ message: "Could not retrieve action from ID" })
			})
})

// UPDATE singular actions
router.put("/:id", (req, res) => {
	const changes = req.body;
	const { description, notes } = req.body;
	if (description && notes) {
		Actions.update(req.params.id, changes)
				.then(action => {
					if (action) {
						res.status(200)
							.json(action)
					} else {
						res.status(404)
							.json({ message: "Project ID does not exist" });
					}
				})
				.catch(err => {
					res.status(500)
						.json({ message: "The action could not be changed" });
				})
	} else {
		res.status(400)
			.json({ message: "Please provide a description and notes" })
	}
});

// DELETE
router.delete("/:id", (req, res) => {
	Actions.remove(req.params.id)
			.then(identifier => {
				if (identifier > 0) {
					res.status(200)
						.json({ message: "The action has been removed" });
				} else {
					res.status(404)
						.json({ message: "The action ID does not exist" });
				}
			})
			.catch(err => {
				res.status(500)
					.json({ message: "The action could not be deleted" });
			})
})

module.exports = router;