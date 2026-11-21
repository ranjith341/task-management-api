const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../src/app");

test("Task Management API", async (t) => {
  let taskId;

  await t.test("Health endpoint works", async () => {
    const response = await request(app).get("/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "UP");
  });

  await t.test("Create a task", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Learn Kubernetes",
      description: "Understand Kubernetes basics",
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.data.title, "Learn Kubernetes");

    taskId = response.body.data.id;
  });

  await t.test("Get all tasks", async () => {
    const response = await request(app).get("/api/tasks");

    assert.equal(response.status, 200);
    assert.ok(response.body.data.length > 0);
  });

  await t.test("Update a task", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ completed: true });

    assert.equal(response.status, 200);
    assert.equal(response.body.data.completed, true);
  });

  await t.test("Delete a task", async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);

    assert.equal(response.status, 200);
  });

  await t.test("Reject an invalid task ID", async () => {
    const response = await request(app).get("/api/tasks/99999");

    assert.equal(response.status, 404);
  });

  await t.test("Reject an empty task title", async () => {
    const response = await request(app).post("/api/tasks").send({ title: "" });

    assert.equal(response.status, 400);
  });
});
