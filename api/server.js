const express = require("express");
const projectsRouter = require("../project/projectsRouter");

const server = express();

server.get("/", (req, res) => {
	res.send("<h1>Hooked into the API!</h1>");
});

server.use("/api/projects", projectsRouter);