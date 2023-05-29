const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./Config/dbConfig')



app.use(express.json());
const PORT = process.env.PORT || 5001;
dbConnect();
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});

app.use("/",require('./Router/bankRoutes'))


