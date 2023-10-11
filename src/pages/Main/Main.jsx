import React from "react";
import { Container } from "react-bootstrap";
import TodoList from "../../components/TodoList/TodoList";

const Main = () => {
  return (
    <Container fluid="xl">
      <TodoList />
    </Container>
  );
};

export default Main;
