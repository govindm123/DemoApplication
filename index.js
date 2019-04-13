var express = require('express');
const http = require('http');
var app = express();
var bodyParser = require('body-parser');
var routes = require("./app/route/index.route.js");
var swaggerUi = require('swagger-ui-express');
    swaggerDocument = require('./swagger.json');

    app.use(bodyParser.json())
 
const db = require('./app/config/db.config.js');  
  //sync database
      db.sequelize.sync().then(function(){
        console.log("Database looks fine");
        }).catch(function(err){
          console.log(err,"someting went wrong");
        });
 
        routes(app);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use('/api/', routes);

// Create a Server
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;