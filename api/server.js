const express = require("express");
const projectsRouter = require("../project/projectsRouter");
const actionsRouter = require("../action/actionsRouter");

const server = express();

function logger(req, res, next) {
	console.log(`${req.method} to ${req.url}`)
	next();
};

server.get("/", (req, res) => {
	res.send("<h1>Hooked into the API!</h1>");
});

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/projects", projectsRouter);
server.use("/api/projects/:id/actions", actionsRouter);


module.exports = server;