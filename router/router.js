const express = require('express')

const route = express.Router();

const users = new Map();

users.set('nodemon@gmail.com',{
    email : 'nodemon@gmail.com',
    password : 'nodemon'
})

route.get('/dashboard',(req, res) => {

    res.render('dashboard')
})

//login route. We can remove argument '/login' from get and post like follows 
//  route
//  .route
//  .get((req,res) =>{...})
//  .post((req,res) =>{...})
//Here second route is builtin. so Be careful when using the same name.
route 
.get('/login',(req, res) => {

    res.render('login')
})
.post('/login', (req, res) => {

    const {email,password} = req.body;
    const error = {};

    if(!email){
        error.emailError = 'Please enter email'
    }
    if(!password){
        error.passError = 'Please enter password'
    }
    if(Object.keys(error).length > 0){
       
        return res.render('login',{error : error})
    }
    
    if(users.has(email)){

        const user = users.get(email);
        if(user.password === password){

            req.session.user =user.email
            return res.render('dashboard')

        }

    }

    res.render('login',{error : error})
})

route.get('/logout', (req, res) => {
    
    req.session.destroy((err) => {
        
        if(err){
            return res.status(500).send("Server Error")
        }
        res.redirect('/login')
    })
})
   

module.exports = route
