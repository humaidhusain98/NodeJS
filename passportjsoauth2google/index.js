const express = require('express')
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport.setup');

const cors= require('cors');
const bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

const isLoggedIn = (req,res,next)=>{
    if(req.user)
    {
        next()
    }
    else
    {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/failed',(req,res)=>{
    res.send("You failed to login!");
});

app.get('/good',isLoggedIn,(req,res)=>{
    res.send(`Welcome ${req.user.displayName}`);
});

// app.get('/index',(req,res)=>{
//     res.send("Hello World!");
// });

app.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/login',
    passport.authenticate( 'google', {
        successRedirect: '/good',
        failureRedirect: '/failed'
}));

app.get('/logout',(req,res)=>{
    req.session=null;
    req.logout();
    res.redirect("/index");

})


app.listen(8080,()=>{
    console.log(`App Listening on port 8080`);
})