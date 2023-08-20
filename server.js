require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use("/", mainRoutes);
app.use("/post", postRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
});