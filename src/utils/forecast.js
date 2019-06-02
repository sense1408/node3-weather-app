const request = require('request')

const forecast = (lat, lng, cb) => {
  const url = `https://api.darksky.net/forecast/4635d34d402025cf296345f418f4894e/${lat},${lng}`   

  request.get({url, json: true }, (err, { body }) => {
  if(err){
    cb('Unable to connect to weather service!', undefined)
  } else if (body.error) {
      cb(body.error, undefined)
  } else {
    
    const result = body.currently
    cb(undefined,`${body.daily.data[0].summary} It is currently ${result.temperature}. There is a ${result.precipProbability} chance of rain.`)
  }
})
}

module.exports = forecast