//
// const express = require('express');
// const app = express();
// const port = 5000;
//
// require('./routes')(app, {});
// app.listen(port,() =>{console.log('We are live '+port)});
const express = require('express');
const bodyParser = require("body-parser");
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/errorLogger')
const myRequestLogger = require('./utilities/requestLogger')

const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(myRequestLogger);
app.use('/', router);
app.use(myErrorLogger);

app.listen(5000);
console.log("Server listening in port 5000");

module.exports = app
