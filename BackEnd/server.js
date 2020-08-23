const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DB = require('./config/db');
const localHost = require('./config/port');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB Setup
mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DataBase Connected Successful!"))
    .catch(err => console.log(err));

// require routers
app.use("/", require("./src/routes/phoneBookRoute")); 

// PORT
const PORT = process.env.PORT || localHost.port;
app.listen(PORT, () => console.log(`Base Url : http://${localHost.host}:${localHost.port}`));
