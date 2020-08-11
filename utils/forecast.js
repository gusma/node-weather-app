const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c14bb19bb662d1798b5d0f0523f69e18&query=' + latitude + ',' + longitude + '&units=m';

    request({url: url, json: true }, (error, response) => {
        if(error) {
           callback('Unable to connect to location services, sorry!', undefined)
        }
        else if(response.body.error) {
            callback('Something has gone terribly wrong! Unable to find location.', undefined)
        }
        else{
            callback(undefined, "It is now " + response.body.current.weather_descriptions[0].toLowerCase() + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast

// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

// module.exports = forecast