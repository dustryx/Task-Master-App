import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { gsap } from "gsap";
import { useParams } from "react-router-dom";
import TaskCard from "../components/Project/TaskCard"; // Import TaskCard component
import '../components/Styles/Taskpage.css';
import NavBar from "../components/Nav/NavBar";
import SideBar from "../components/Nav/SideBar";
import { api } from "../utils/api";

const TaskPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "low",
    status: "pending",  
  });

  const taskContainerRef = useRef(null);
  const addModalRef = useRef(null);

  useEffect(() => {
    api
      .get(`/dashboards/${id}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));

    gsap.fromTo(
      taskContainerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, [id]);

  const onTaskUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const onTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = () => {
    api
      .post(
        `/tasks/${id}`,
        { ...newTask, dashboard_id: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        const taskId = response.data.task; // Extract task ID from the response
        return api.get(`/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      })
      .then((response) => {
        setTasks([...tasks, response.data]); // Add the full task object to the tasks list
        setNewTask({
          title: "",
          description: "",
          due_date: "",
          priority: "low",
          status: "pending",
        });
        setShowAddModal(false);
      })
      .catch((error) => console.error("Error creating task:", error));
  };

  return (
    <div className="task-page">
      <NavBar />
      <SideBar />

      <div className="task-page-container" ref={taskContainerRef}>
        <h2 className="task-page-title">Tasks</h2>
        <div className="task-page-buttons">
          <Button
            onClick={() => setShowAddModal(true)}
            className="add-task-button"
          >
            Add Task
          </Button>
        </div>

        <div className="task-cards-container">
          {tasks.length === 0 ? (
            <p className="no-tasks-placeholder">
              No tasks available. Please add a task.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}
              />
            ))
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="popup-card-container" ref={addModalRef}>
          <div className="popup-card">
            <h3>Add New Task</h3>
            <Form>
              <Form.Group controlId="formTaskTitle" className="form-group">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="form-control"
                />
              </Form.Group>
              <Form.Group
                controlId="formTaskDescription"
                className="form-group"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5} // Adjusted size
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formTaskDueDate" className="form-group">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) =>
                    setNewTask({ ...newTask, due_date: e.target.value })
                  }
                  className="form-control"
                />
              </Form.Group>
              <div className="form-row">
                <Form.Group controlId="formTaskPriority" className="form-group">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    as="select"
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formTaskStatus" className="form-group">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={newTask.status}
                    onChange={(e) =>
                      setNewTask({ ...newTask, status: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="modal-actions">
                <Button
                  variant="primary"
                  onClick={handleAddTask}
                  className="action-buttons"
                >
                  Create Task
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                  className="action-buttons"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
