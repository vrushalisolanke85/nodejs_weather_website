const request=require('request')

const forcast=(lat,log,callback)=>{
const url="http://api.weatherstack.com/current?access_key=8982024363a0facea5452d961b8f0f6f&query="+lat+','+log+"&units=f"
console.log(lat,log)
request({url, json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect',undefined)
    }else if(body.error){
        callback('unable to fine location',undefined)
    }else{
   
    //console.log(response.body.current)
    callback(undefined,body.current.weather_descriptions+'it is currently '+body.current.temperature+'degree out. It feels like '+body.current.feelslike+' degree out')
}
})
}

module.exports=forcast