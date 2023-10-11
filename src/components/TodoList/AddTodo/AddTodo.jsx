import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../../../store/todosReducer";

import "./AddTodo.css";
import TodoModalForm from "../../TodoModalForm/TodoModalForm";

const AddTodo = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const handleSubmit = (newTodo) => {
    newTodo.id = Date.now();
    dispatch(addTodoAction(newTodo));
  };

  return (
    <Stack direction="horizontal" gap={1}>
      <button onClick={handleShow} id="add-todo" />

      <TodoModalForm show={show} onClose={handleHide} onSubmit={handleSubmit} title="Add todo" />
    </Stack>
  );
};

export default AddTodo;
