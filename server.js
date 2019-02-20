const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log("Error"); 
        }
    });
    console.log(``);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintance.hbs', {
//         pageTitle: "PAGE UNDER MAINTANCE",
//         message: "Please come back later"
//     })
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send("<h1>Hello express</h1>");
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website",
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Bad Request"
    })
})

app.listen(4000, () => {
    console.log("Server is running on 4000");
});