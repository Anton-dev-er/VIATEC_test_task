import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { statuses } from "../../constatns";

const TodoModalForm = ({ show, onClose, onSubmit, todo, title }) => {
  const [validated, setValidated] = useState(false);

  const handleClose = (e) => {
    onClose(e);
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const title = form.querySelector("#title").value;
      const description = form.querySelector("#description").value;
      const status = form.querySelector("#status").value;

      onSubmit({ title, description, status });
      onClose(e);
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" id="title" minLength={1} defaultValue={todo?.title || ""} required />
            <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              id="description"
              rows={3}
              minLength={1}
              defaultValue={todo?.description || ""}
              required
            />
            <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select id="status" defaultValue={todo?.status || ""}>
              {Object.values(statuses).map((status) => (
                <option key={status.key} value={status.key}>
                  {status.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TodoModalForm;
