require('dotenv').config();
const app = require('./app');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');




const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Mongo is showing love'))

app.listen(PORT, () => {
    console.log(`We in the building ${PORT}`)
});