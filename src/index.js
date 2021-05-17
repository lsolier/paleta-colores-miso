const express = require('express');
const path = require('path')

//Get server from express
const app = express();

//settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//routes
app.use(require('./routes/index'));

//middlewares


//static files

//listening server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});