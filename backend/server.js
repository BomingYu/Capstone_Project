require("dotenv").config();
const express = require("express");
let dbConnect = require("./dbConnect");
const userRoute = require("./routes/userRoute")

const app = express();
const PORT = 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

app.use("/users", userRoute);


app.listen(PORT, () => {
    console.log("Listen on port " + PORT)
})