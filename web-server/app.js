const express = require("express");
const path = require("path");

const app = express();

// Defines paths for Express Config
app.use(express.static(publicDirectoryPath));

// Sets config for handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setup static directory to serve
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Andrew Mead",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Andrew Mead",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		forecast: "It is snowing",
		location: "Philadelphia",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
