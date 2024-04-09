const express = require('express')
const app = express();
require('dotenv').config();
const path = require('path')
const routes = require('./router/router')
const session = require('express-session');

app.use('/static', express.static(path.join(__dirname,'public')))

const port = process.env.port || 1010

app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//session
app.use(session({
    secret: process.env.MySecretId,
    resave: false,
    saveUninitialized: true
}))

const {noCacheMid, authenticationMid} = require('./middleware/middleware');

//middleware here
app.use(noCacheMid)
app.use(authenticationMid);

//routes here
app.use('/', routes)

//Default routes
app.get('/', (req, res) => {

    if(req.session.user){
        return res.redirect('/dashboard')
    }
    res.redirect('/login')
})

app.get('/*', (req, res) => {
    res.redirect('/')
})

app.listen(port,() => {
    console.log(`server is running at http://localhost:${port}/`)
})