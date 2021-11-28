require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require("express");
const app = express();
app.use(express.json()); // parse json bodies in the request object i.e. to read req.body.<params>
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cors enabling
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Global Error Handler.
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({
        message: "Something went really wrong",
    });
});

// user routes
const userRoute = require("./routes/User");
app.use("/user", userRoute);

// discuss routes
const discussRoute = require("./routes/Discuss");
app.use("/discuss", discussRoute);

// voting routes
const voteRoute = require("./routes/Vote");
app.use("/vote", voteRoute);

// Listen on pc port
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
