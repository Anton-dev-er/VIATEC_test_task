import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodoAction } from "../../../store/todosReducer";

import TodoModalForm from "../../TodoModalForm/TodoModalForm";
import "./UpdateTodo.css";

const UpdateTodo = ({ todo }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const handleSubmit = (updatedTodo) => {
    updatedTodo.id = todo.id;
    dispatch(updateTodoAction(updatedTodo));
  };

  return (
    <>
      <button onClick={handleShow} className="todo-item__edit" />

      <TodoModalForm show={show} onClose={handleHide} onSubmit={handleSubmit} todo={todo} title="Update todo" />
    </>
  );
};

export default UpdateTodo;
