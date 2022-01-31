const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
const index = require('./routes/index');
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongo connected.");
    })
    .catch((err) => {
        console.error("Mongo connect error: ", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(index);

app.listen(port, (req, res) => {
    console.log('Rodando na porta:', port)
});
