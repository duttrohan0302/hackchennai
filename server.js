// Import Modules
const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
// config setup
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const district = require('./routes/district');
const user = require('./routes/user');
const path = require("path")
// const data = require('./config/db.json')
// console.log(data)
// Import DB URI
const { mongoURI } = require('./config');

// PORT
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log(err));



app.use('/',district);
app.use('/',user);

if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Start Server
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})