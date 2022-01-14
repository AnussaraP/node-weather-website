const request = require('request')


const geocode = (address,callback)=>{
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXByb21kZWUiLCJhIjoiY2t5MGw4Z3loMDJxaDJ1cG4zc3N0YmZ0NCJ9.ew8wjwqgXvNzbnIUBUsfxQ&limit=1'

    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXByb21kZWUiLCJhIjoiY2t5MGw4Z3loMDJxaDJ1cG4zc3N0YmZ0NCJ9.ew8wjwqgXvNzbnIUBUsfxQ&limit=1' //encodeURIComponent() => this is function, allow special charactors 
      
request({ url, json:true }, (error,{body})=>{       //it was response but change to {body}, make it shorter 
    if(error){
        callback('Unable to connect to location services', undefined)   //error = undefined will show because thr is no error, if there is error will shoe the text 

    }else if(body.features.length === 0){  //it was .response.body...
        callback('Unable to find location. try another search',undefined)

    }else{
        callback(undefined,{
            latitude:body.features[0].center[0],    //.response.latitude.body...
            longtitude:body.features[0].center[1],
            location: body.features[0].place_name
        })

    }

})
}
// geocode('Bournemouth',(error,data)=> {    //address=> 'New York', callback = (error,data)
//     console.log('Error',error)
//     console.log('Data',data)

// })  //this is callback function after 'UK' (( )=>{ })








//&limit=1

module.exports= geocode



