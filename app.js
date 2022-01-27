const express = require("express");
const mongoose = require("mongoose");
//const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connected.");
  })
  .catch((err) => {
    console.error("Mongo connect error: ", err);
  });

const app = express();

/*const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  credentials: true,
  allowedHeaders: 'authorization, X-PINGOTHER, Content-Type',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server online",
  });
});

app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
