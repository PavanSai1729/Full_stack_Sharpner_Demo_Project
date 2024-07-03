const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const db= require("./util/database");
const stationaryRoutes = require("./routes/stationaryRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use(stationaryRoutes);


db
    .sync()
    .then((response) => {
        console.log("successfully database connected");
        app.listen(7000);
    })
    .catch((error) => {
        console.log("database connection failed", error);
    });