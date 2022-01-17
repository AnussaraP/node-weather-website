const request = require('request')


const forecast =(latitude,longtitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d752dde4fc101d46c7ae5b756eb1a682&query='+ latitude +','+longtitude  //'50.7183,-1.8833'
   
    request({url:url, json:true},(error,{body})=>{ //this was responce but change to {body} shorter object 
    if(error){
        callback('Unable to connect to the weather service!',undefined)

    }else if(body.error){
        callback('Unable to find the location. Please try another search',undefined)

    }else{
        callback(undefined,
            
            'Today weather: ' + body.current.weather_descriptions[0] + '. It is currently ' 
            + body.current.temperature + ' degree.' + ' But it feels like ' + body.current.feelslike + ' degree out there ' + 'Current local time: ' +body.location.localtime,
            
            
        )

    }


})


}

module.exports = forecast
