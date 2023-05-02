const express = require('express')
const app = express()
const router = require('./routers/routes');
const bodyParser = require('body-parser');


//Middleware Use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use('/api/v1', router);


//Get All Notes
//Create Notes
//Update Note
//Delete Note
//Share Note
//app.use('api', router);
app.listen(3000)