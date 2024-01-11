const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8000;

//connecting to Database
const connectDb = require('./database/db.js');
connectDb();

//middleware
app.use(bodyParser.json());
app.use(cors());

//static files for deployment
app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname),'./client/build/index.html');
})

//Routes
app.use('/api/files',require('./routes/routes.js'));
app.use('/files',require('./routes/show.js'));
app.use('/files/download',require('./routes/download.js'));

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})