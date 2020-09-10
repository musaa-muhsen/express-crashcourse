/*
middle is essentially a function which takes a request,a response and a next() param and it will call
next() whenever it wants to move on to the next form of middleware and in between there it can modify 
the request and response however it sees fit 
*/

const express = require('express');
const app = express();

app.use(logger); 
// always put the global actions at the top of the file before the controller 

app.get('/', (req,res, next) => {
    res.send('Home page');
    next(); // this go the next logger 
})

app.get('/users', auth, (req, res, next) => {
    console.log(`User is admin = ${req.admin}`)
    console.log('Users Page')
    res.send('Users Page');
   // next(); no need to be used here 
})

//app.use(logger); here the function does get reached if not next is not being called

// this is going to global to our entire application 
function logger(req, res, next) {
    console.log(req.originalUrl) // use case for middleware almost like a filter 
    next();
    console.log('after');
}

// middleware that is specific to single action 
function auth(req, res, next) {
   // if condition is true from the url 
   if(req.query.admin === 'true') {
      req.admin = true; // set request.admin to true
      next(); // important where this placed in the statement
      return // so it will return from the function if complete 
   } else {
       res.send('No auth')
   }


}

app.listen(5001)

// is send() method part of express? yes it is 

/*
 middleware definition is essentially all that middleware is a function or program or something 
 that is going to between the time that the server gets the request and the time that the server sends
 the request out to the client so when I click refresh here I'm sending a request to the server and 
 that gets to the server and this app.get() processes it and middleware is anything that happnens 
 between the time the server gets the request and the time that the server sends out a response 
 so = 
 (req, res) => {
    res.send('')
}
... is actually a middleware because it's happening in between beginning of the response and sending of the response 
and that is something really important to understand with express is that every single thing you write 
in relattion to actgions such app.get() for these different actions is going to be middleware 

so when you have your request and response variable that is a middleware that you are writing that is 
going to be acting in between the response sending and getting 
 */