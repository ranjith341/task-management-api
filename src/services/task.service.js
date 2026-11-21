let tasks = [];
let nextTaskId = 1;

const getAllTasks = () => {
  return tasks;
};

const getTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

const createTask = (title, description) => {
  const task = {
    id: nextTaskId++,
    title,
    description,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(task);

  return task;
};

const updateTask = (id, updates) => {
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    task.title = updates.title;
  }

  if (updates.description !== undefined) {
    task.description = updates.description;
  }

  if (updates.completed !== undefined) {
    task.completed = updates.completed;
  }

  return task;
};

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);

  return true;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
