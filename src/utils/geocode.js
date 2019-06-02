const request = require('request')

const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2Vuc2UxNDA4IiwiYSI6ImNqdWhjMnh1YTA0bW40Zm1vNXZjMWwxcW8ifQ.BMzTaaFpa5kdvL2hHftSjg`
    
    request({url, json: true }, (err, { body }) => {
       if(err) {
           cb('Unable to connect to location services!', undefined)
       }
       else if(body.features.length === 0) {
           cb('Unable to find geo location!', undefined)    
       }else {
         const result = body.features[0].center
         const place = body.features[0].place_name
         cb(undefined, {
              latitude: result[1],
              longitude: result[0],
              place: place 
         })     
       }
    })
   }

module.exports = geocode 