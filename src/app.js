const express = require("express");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Task Management API is running on EKs",
  });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;
