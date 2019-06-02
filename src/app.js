const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.use(express.static(publicDir))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather app',
        name: 'Vlad Logvinov'
    })
})

app.get('/help', (req , res) => {
    res.render('help', {
        message: 'This page helps you',
        title:'Help',
        name:'Vlad Logvinov'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Vladimir',
        name: 'Vlad Logvinov'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address

    geocode(address, (err, geo) => {
         if(err) {
             return res.json({error:err})
         }
         forecast(geo.latitude, geo.longitude, (e, forecastData) => {
             if(e) {
                 return res.json({ error: e })
             }
             return res.json({
                forecast: forecastData,
                location: geo.place,
                address
                })
         })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })        
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Vlad Logvinov',
        error:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Vlad Logvinov',
        error:'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})