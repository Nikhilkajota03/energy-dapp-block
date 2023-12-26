require("dotenv").config();

const express = require("express");
const app = express();
const port =  process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/registration");
const cookieParser = require("cookie-parser");


const authRoute = require("./Routes/auth");
const marketTra = require("./Routes/mak")
const aucte = require("./Routes/Auct")

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/// USER ROUTES

app.use('/api/auth',authRoute)
app.use("/api/mak",marketTra)
app.use("/api/auct",aucte)



process.env.MONGO_URL

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
