const express = require('express');
const path = require('path');
//const membersRoutes = require('./routes/api/members')
//const logger = require('./middleware/logger')
const exphbs = require('express-handlebars'); // view engine 
const members = require('./Members');

const app = express();

// Body Parser Middleware
// so is this been added throughout the app 
// to get a response so we need to use a body parser 
app.use(express.json()) // to deal with raw json incoming can be configured// incoming or outgoing?
app.use(express.urlencoded({extended: false})); // this is for accepting form data  


//app.use(logger); // init middleware 

// handlebars middleware
//middleware so the script knows to use handlebars as the view engine 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));// so we're setting the engine the view engine our templete engine to handlebars and then we're just passing in this exphbs and setting the default file of main so when we create our layout we want to call it main.handlebars
app.set('view engine', 'handlebars');


// Homepage Route 
app.get('/', (req,res) => {
   res.render('index', {
      title: 'Member App',
      members: members
   })

}); // index because we want to render the index view 


// set a static folder 
// if you have a basic web app do this, it's a built in express features you can add css images everything and it will deal with the content-type 
// this is same as we did on the node crash course except this is one line of code if just a simple web app/ static files 
app.use(express.static(path.join(__dirname, 'public'))); // you want be using this in real life though really 

// Members API Routes 
app.use( '/api/members', require('./routes/api/members') );


const PORT = process.env.PORT || 5001;
// to run the web server 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));











// just port with express with alone will give you "cannot GET /" and it's basically just saying that it can't find a route handler for this slash or /about because we haven't created any routes any endpoints   

/*
for the most part you're going to use express for  
1) JSON api's so that you connect from a front-end like react or something like that 
2) render templates where you can insert dynamic data so you can create dynamic app rather than just a static website 

*/

/*
// get method will always be a situation when a user goes to a page 
// every route we create we're going to have access to this request and response object 
app.get('/', (req,res) => {

   res.sendFile(path.join(__dirname, 'public', 'index.html'));
   // res.send('<h1>Hello!!</h1>'); //the most basic way 
    //res.render() when using template engines 
   // res.end(); no need for when using express
   //console.log(req) 
});
*/