const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Setup static directory to serve
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");
const partialsPath = path.join(__dirname, "./views/partials");

// Defines paths for Express Config
app.use(express.static(publicDirectoryPath));

// Sets config for handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
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
	if (!req.query.address) {
		return res.send({
			error: "Please provide an address.",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

// 404 Page

app.get("*", (req, res) => {
	res.render("404", {
		mainText: "Sorry, the URL you're looking for cannot be found!",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
