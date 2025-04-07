const express = require("express");
const cookieParser = require("cookie-parser"); 
const dotenv = require("dotenv");
const { v1Routes } = require("./routes/v1");
const { corsPolicy } = require("./config/cors");
const path = require("path");
const { handle404Error, handleGlobalError, } = require("./middlewares");
dotenv.config();

const app = express();

app.use(corsPolicy)
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

app.use("/api/v1", v1Routes);

app.use(handle404Error);
app.use(handleGlobalError);

module.exports = { app };
