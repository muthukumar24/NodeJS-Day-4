const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const boydParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors())
app.use(boydParser.json())
// routes
app.use('/apiUser', userRoutes);

mongoose.connect(process.env.MONGODB)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(error => {
    console.error("Connection Error", error.message);
});