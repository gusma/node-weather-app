const request = require("request");

const url = 'http://api.weatherstack.com/current?access_key=c14bb19bb662d1798b5d0f0523f69e18&query=-34.594822,-58.449186';

request({ url: url, json:true }, (error, response) => {
   console.log(response.body.current);
})