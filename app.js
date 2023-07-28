// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
/*
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
*/
const teamsRoutes = require("./routes/team.routes");
app.use("/api", teamsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const leagueRoutes = require("./routes/league.routes");
app.use("/api/leagues", leagueRoutes);
// app.use("/api/leagues", , leagueRouter);

const gameRoutes = require("./routes/game.routes");
app.use("/api/games", gameRoutes);

const playerRoutes = require("./routes/player.routes");
app.use("/api/players", playerRoutes);

const courtRoutes = require("./routes/court.routes");
app.use("/api", courtRoutes);

const awsRoutes = require("./routes/aws.routes");
app.use("/api/s3", awsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
