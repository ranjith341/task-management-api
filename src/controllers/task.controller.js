const taskService = require("../services/task.service");

const getAllTasks = (req, res) => {
  const tasks = taskService.getAllTasks();

  return res.status(200).json({
    success: true,
    data: tasks,
  });
};

const getTaskById = (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const task = taskService.getTaskById(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: task,
  });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      success: false,
      message: "Description must be a string",
    });
  }

  const task = taskService.createTask(title.trim(), description?.trim() || "");

  return res.status(201).json({
    success: true,
    data: task,
  });
};

const updateTask = (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const { title, description, completed } = req.body;

  if (
    title === undefined &&
    description === undefined &&
    completed === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required for update",
    });
  }

  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      success: false,
      message: "Description must be a string",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be a boolean",
    });
  }

  const task = taskService.updateTask(taskId, {
    title: title?.trim(),
    description: description?.trim(),
    completed,
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: task,
  });
};

const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const deleted = taskService.deleteTask(taskId);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
