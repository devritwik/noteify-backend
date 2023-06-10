const express = require('express')
require('dotenv').config
const router = require('./routers/routes');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express()

const corsOptions ={
   origin:'*', 
   credentials:true, 
   optionSuccessStatus:200,
}


//For cors
app.use(cors(corsOptions))

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
const PORT = process.env.PORT 
app.listen(PORT);
