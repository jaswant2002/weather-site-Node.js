const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000


// define path for express config
const publicDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// customizing views directory
const viewsPath = path.join(__dirname, '../templates/views');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



// setup static directory to serve
app.use(express.static(publicDirectory));


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        });
    }
    // res.send({
    //     forest: 'It is 50 degrees!',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // });

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            });
        })
    })


})

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Jaswant'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Jaswant'
    });
})

// app.get('/products', (req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         });
//     }
//     console.log(req.query.search);

//     res.send({
//         products: []
//     })
// });



app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'Need help? Shoot us an email here help@mywebsite.org',
        title: 'Help',
        name: 'Jaswant'
    });
})


app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Jaswant',
        errorMessage:'Help article not found'
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Jaswant',
        errorMessage:'Page not found'
    });
})


app.listen(port, () =>{
    console.log('server is up on port '+port);
})