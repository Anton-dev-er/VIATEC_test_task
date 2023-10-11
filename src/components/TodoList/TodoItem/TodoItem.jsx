import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import "./TodoItem.css";
import { useDispatch } from "react-redux";
import { changeStatusTodoAction, removeTodoAction } from "../../../store/todosReducer";
import { statuses } from "../../../constatns";
import UpdateTodo from "../UpdateTodo/UpdateTodo";

const statusesOptions = [
  { status: statuses.done.key, color: "success" },
  { status: statuses["in-progress"].key, color: "info" },
];

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [statusOptions, setStatusOptions] = useState({});

  useEffect(() => {
    const status = statusesOptions.filter((statusOptions) => statusOptions.status === todo.status)[0];
    setStatusOptions(status);
  }, [todo.status]);

  const handleChangeStatus = () => {
    let newStatus;
    if (todo.status === statuses.done.key) {
      newStatus = statuses["in-progress"].key;
    } else {
      newStatus = statuses.done.key;
    }

    dispatch(changeStatusTodoAction({ id: todo.id, status: newStatus }));
  };

  const handleRemove = () => {
    dispatch(removeTodoAction(todo));
  };

  return (
    <Stack direction="horizontal" gap={2}>
      <button onClick={handleChangeStatus} className={`todo-item__status ${statusOptions.color}`} />
      <div className={`todo-item__content-wrapper ${statusOptions.color}`}>
        <p className="todo-item__title">{todo.title}</p>
        <p className="todo-item__description">{todo.description}</p>
      </div>

      <UpdateTodo todo={todo} />
      <button onClick={handleRemove} className="todo-item__remove" />
    </Stack>
  );
};

export default TodoItem;
