const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=73c7d3902d53712648b82197fc46b4a3&query='+latitude+','+longitude+'&units=f';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + ', It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. It feels like '+body.current.feelslike+" degrees out and the humidity is "+body.current.humidity+".")
        }
    })
}

module.exports = forecast