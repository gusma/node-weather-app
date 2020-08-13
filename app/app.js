const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const address = process.argv[2]

if (!address) {
    console.log('\nSorry but we don\'t have any information on the place you\'re looking for. Please provide an address!\n')
}

else{ 
geocode(address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
        return console.log(error)
    }
   
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log("\nYou must be looking for " + chalk.bold(location))
        console.log(forecastData)
    
    })
})
}
