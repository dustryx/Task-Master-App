import { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { api } from "../../utils/api";
import PropTypes from 'prop-types';  // Import PropTypes
import "../Styles/TaskCard.css";
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const navigate = useNavigate(); 

  const handleInvite = () => {
    const email = prompt("Enter the email address to invite:");
    if (email) {
      api.post(`/tasks/${task.id}/invite`, { email })
        .then((response) => alert(response.data.message))
        .catch((error) => console.error("Error sending invitation:", error));
    }
  };

  const handleEditTask = () => {
    api.patch(`/tasks/${task.id}`, editedTask)
      .then((response) => {
        onTaskUpdate(response.data);
        setShowEditModal(false);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDeleteTask = () => {
    api.delete(`/tasks/${task.id}`)
      .then(() => onTaskDelete(task.id))
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <>
      <Card className="task-card">
        <Card.Body className="task-body">
          <div className="task-details">
            <Card.Title className="task-title">{task.title}</Card.Title>
            <Card.Text className="task-text">{task.description}</Card.Text>
            <Card.Text className="task-text">Due: {task.due_date}</Card.Text>
            <Card.Text className="task-text">Priority: {task.priority}</Card.Text>
            <Card.Text className="task-text">Status: {task.status}</Card.Text>
          </div>
          <div className="task-actions">
            <Button
              variant="secondary"
              className="task-action-button secondary"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="task-action-button danger"
              onClick={handleDeleteTask}
            >
              Delete
            </Button>
            <Button
              variant="info"
              className="task-action-button info"
              onClick={handleInvite}
            >
              Invite
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Task Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName="modal-dialog"
        backdropClassName="modal-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle" className="form-group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskDescription" className="form-group">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskDueDate" className="form-group">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={editedTask.due_date}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, due_date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskPriority" className="form-group">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
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
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Define prop types for the TaskCard component
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    due_date: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
};

export default TaskCard;
