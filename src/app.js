const exp = require('constants')
const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')

//setting path for customise views
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//setup handler engine and customise view
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
const geocode=require('../Utils/geocode')
const forcast=require('../Utils/forcast')

app.use(express.static(publicDirPath))

app.get('/',(req,res)=>{
    res.render('index',{title:'Weather Application',name:'Vrushali'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Vrushali'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',name:'Vrushali'})
})

// app.get('/weather',(req,res)=>{
//     res.send('Weather')
// })



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide address!!!"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    })
})


//e.g. help specific page /hepl/test not found
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vrushali',
        msgError:'Help artical page not found'
    })
})


//generic 404 error ,message
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vrushali',
        msgError:'404 Page not found'
    })
})


app.listen(3000,()=>{
    console.log('Server connected successfully on port 3000!!!!!')
})