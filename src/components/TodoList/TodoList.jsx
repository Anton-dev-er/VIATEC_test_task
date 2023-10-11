import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./AddTodo/AddTodo";
import "./TodoList.css";
import { initTodoAction } from "../../store/todosReducer";
import { statuses } from "../../constatns";

const filterOptions = [
  {
    id: "all",
    label: "All",
    default: true,
  },
  {
    id: statuses.done.key,
    label: "Done",
  },
  {
    id: statuses["in-progress"].key,
    label: "In progress",
  },
];

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const [selectedFilterOption, setSelectedFilterOption] = useState(filterOptions[0].id);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      dispatch(initTodoAction(JSON.parse(localTodos)));
    }
  }, []);

  useEffect(() => {
    if (selectedFilterOption) {
      if (selectedFilterOption === filterOptions[0].id) {
        setFilteredTodos(todos);
      } else {
        const filteredTodos = todos.filter((todo) => todo.status === selectedFilterOption);
        setFilteredTodos(filteredTodos);
      }
    }
  }, [selectedFilterOption, todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Form className="todo-list__filter">
        <div className="mb-3">
          {filterOptions.map((item) => (
            <Form.Check
              key={item.id}
              inline
              checked={item.id === selectedFilterOption}
              name="todo"
              type="radio"
              id={item.id}
              label={item.label}
              onChange={() => setSelectedFilterOption(item.id)}
            />
          ))}
        </div>
      </Form>

      <ListGroup className="align-items-center">
        {filteredTodos.map((todo) => (
          <ListGroup.Item key={todo.id} className="todo-list__item">
            <TodoItem todo={todo} />
          </ListGroup.Item>
        ))}
        <ListGroup.Item key={0} className="todo-list__item">
          <AddTodo />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default TodoList;
