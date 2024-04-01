const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoute = require("./routes/adminRoutes");
const authRoute = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");

connectDB();
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 8080;

app.use("/api", adminRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Running on PORT ${port}`);
});
