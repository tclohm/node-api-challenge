const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// CREATE
router.post("/", (req, res) => {
	Projects.insert(req.body)
			.then(project => {
				if (project) {
					res.status(201)
						.json(project)
				} else {
					res.status(400)
						.json({ message: "Please provide a name and description" });
				}
			})
			.catch(err => {
				console.log(err)
				res.status(500)
					.json({ message: "Could not save the new project to the DB" });
			})
});

// READ plural
router.get("/", (req, res) => {
	Projects.get(req.query)
			.then(projects => {
				res.status(200)
					.json(projects);
			})
			.catch(err => {
				console.log(err);
				res.status(500)
					.json({ message: "Error retrieving the posts" });
			})
});

// READ singular
router.get("/:id", (req, res) => {
	Projects.get(req.params.id)
			.then(project => {
				if (project) {
					res.status(200)
						.json(project)
				} else {
					res.status(404)
						.json({ message: "The post ID does not exist in the DB" });
				}
			})
			.catch(err => {
				res.status(500)
					.json({ message: "Error retrieving post using ID" });
			})
});

// READ singular
router.get("/:id/actions", (req, res) => {
	Projects.getProjectActions(req.params.id)
			.then(actions => {
				if (actions) {
					res.status(200)
						.json(actions);
				} else {
					res.status(404)
						.json({ message: "The actions don't exist" });
				}
			})
			.catch(err => {
				res.status(500)
					.json({ message: "The actions could not be retrieved" });
			});
});

// UPDATE singular
router.put("/:id", (req, res) => {
	const changes = req.body;
	const { name, description } = req.body;
	if (name && description) {
		Projects.update(req.params.id, changes)
				.then(project => {
					if (project) {
						res.status(200)
							.json(project)
					} else {
						res.status(404)
							.json({ message: "The project ID does not exist" });
					}
				})
				.catch(err => {
					res.status(500)
						.json({ message: "The existing project could not be updated" });
				})
	} else {
		res.status(400)
			.json({ message: "Please provide name and description for the project you want to update" });
	}
});


// DELETE singular
router.delete("/:id", (req, res) => {
	Projects.remove(req.params.id)
			.then(identifier => {
				if(identifier > 0) {
					res.status(200)
						.json({ message: "Project has been removed" });
				} else {
					res.status(404)
						.json({ message: "Project ID does not exist" });
				}
			}).catch(err => {
				console.log(err);
				res.status(500)
					.json({ message: "Project could not be deleted" });
			})
});

module.exports = router;