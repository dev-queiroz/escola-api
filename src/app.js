const express = require("express");
const serviceRoutes = require("./routes/serviceRoutes");
const providerRoutes = require("./routes/providerRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use(errorHandler);

module.exports = app;
