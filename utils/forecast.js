const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c14bb19bb662d1798b5d0f0523f69e18&query=' + latitude + ',' + longitude + '&units=m';

    request({url: url, json: true }, (error, { body }) => {
        if(error) {
           callback('Unable to connect to location services, sorry!', undefined)
        }
        else if(body.error) {
            callback('Something has gone terribly wrong! Unable to find location.', undefined)
        }
        else{
            callback(undefined, "It is now " + body.current.weather_descriptions[0].toLowerCase() + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast