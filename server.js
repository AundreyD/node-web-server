const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 5454;

let app = express();

hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '/n', (err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    })
    
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         welcomeMessage: 'Undergoing Changes, be back soon'
//     })
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Challenge Completed'
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });

});

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'All projects can be viewed here',
        welcomeMessage: 'Go here to view all projects',
        urlLink: 'http://www.github.com/AundreyD'
    });

})

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Bad Request'
    })
})

app.get('/help.html',(req, res)=>{
    res.send('<h1>I figued it out</h1>')
})



app.listen(port, ()=>{
    console.log(`Server up on ${port}`)
});