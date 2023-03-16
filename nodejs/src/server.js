import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web";
import dotenv from 'dotenv';
import connectDB from "./config/connectDB";
dotenv.config()
// require('dotenv').config();

let app = express();
// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969; // lấy port trong env
app.listen(port, () => {
    //callback
    console.log("backend Nodejs port : " + port);
})