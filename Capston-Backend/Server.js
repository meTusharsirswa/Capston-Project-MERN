// const express = require("express");
// const PORT = 4000;
// const app = express();
// app.use(express.json());

// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://127.0.0.1:27017/HotelApi", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("Database Connected"))
//   .catch(error => console.error("Database Connection Error:", error));

// const users = require("./routes/User");
// const Hotels = require("./routes/Hotel");
// app.use("/", users);

// app.use('/',Hotels)

// app.listen(PORT, () => {
//   console.log(`Server is listening on ${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const api = require("./routes/api");
// const Hotels = require("./routes/Hotel");
var cors = require('cors');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error while connection Server!!");
});

db.once("open", () => {
  console.log("Database Connected Successfully!!");
});

const app = express();



const corsOpt = {
  origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
  allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/", api);




