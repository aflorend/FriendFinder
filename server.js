// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Express
const app = express();
var PORT = 3000;

// Routers
const router = require('./app/routing/htmlRoutes.js').router;
const apiRouter = require('./app/routing/apiRoutes.js').apiRouter;

app.use('/api/friends', apiRouter);
app.use('/', router);


// Listen to PORT
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});
