const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3VzbWE4MyIsImEiOiJja2RwZ3F3dGswdm02MnlzYXhub2tnc21iIn0.cTOxL2dYABzaLmQy7zS8jw&limit=1';

    request({url: url, json: true }, (error, response) => {
        if(error) {
           callback('Unable to connect to location services, sorry!', undefined);
        }
        else if(response.body.features.length === 0) {
            callback('Unable to find the sought address! Sorry!')
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0], 
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode