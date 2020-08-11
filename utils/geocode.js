const https = require('https')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3VzbWE4MyIsImEiOiJja2RwZ3F3dGswdm02MnlzYXhub2tnc21iIn0.cTOxL2dYABzaLmQy7zS8jw&limit=1';

    const req= https.request(url, (res) => {

        let data = ''

        res.on('data', chunk => {
            data += chunk.toString()
        })
        res.on('end', () => {
            const geoCodeData = JSON.parse(data)
            callback(undefined, {
                            latitude: geoCodeData.features[0].center[1],
                            longitude: geoCodeData.features[0].center[0], 
                            location: geoCodeData.features[0].place_name
                        })
        })
        res.on('errors', (e) => {
            console.log("There was an error:" + e.message)
        })
    })
    
    req.on('error', (error) => {
        callback('Sorry but there has been an error', undefined)
    })
    req.end()

}

module.exports = geocode
