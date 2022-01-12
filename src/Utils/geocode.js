const request=require('request')

const geocode=(address,callback)=>{
console.log(address)
const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic29sYW5rZXZydXNoYWxpIiwiYSI6ImNreTRoYXkybzBieGEydXB5b3ZyMDEwNTEifQ.52tSVhVcGL0u2CkrHCMp9g&unit=1"
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect',undefined)
    }else if(body.features.length===0){
        callback('unable to find location..please try again',undefined)
    }else{
        callback(undefined,{
            latitude:body.features[0].center[0],
            longitude:body.features[0].center[1],
            location:body.features[0].place_name
            })
       
    }
    })
}

module.exports=geocode