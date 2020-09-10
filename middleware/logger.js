const moment = require('moment');

// when you create middleware it takes in the request, response and then next and you always want to call next last so that you can move to the next middleware function thats in the stack 
function logger (req, res, next) {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
    return
 }

 module.exports = logger;