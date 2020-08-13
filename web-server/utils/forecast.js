const http = require("http");
const chalk = require("chalk");

const forecast = (latitude, longitude, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=c14bb19bb662d1798b5d0f0523f69e18&query=" +
		latitude +
		"," +
		longitude;

	const req = http.request(url, (res) => {
		let data = "";

		res.on("data", (chunk) => {
			data += chunk.toString();
		});
		res.on("end", () => {
			const bodyData = JSON.parse(data);
			callback(
				undefined,
				"It is now " +
					bodyData.current.weather_descriptions[0].toLowerCase() +
					". It is currently " +
					bodyData.current.temperature +
					" degrees celsius. It feels like " +
					bodyData.current.feelslike +
					" degrees outside."
			);
		});
		res.on("errors", (e) => {
			console.log("There was an error:" + e.message);
		});
	});

	req.on("error", (error) => {
		callback("Sorry but there has been an error", undefined);
	});
	req.end();
};

module.exports = forecast;
