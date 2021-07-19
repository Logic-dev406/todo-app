import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [fillteredTodos, setFillteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    fillterHandler();
    saveLocalTodos();
  }, [todos, status, fillterHandler]);

  function fillterHandler() {
    switch (status) {
      case "completed":
        setFillteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFillteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFillteredTodos(todos);
        break;
    }
  }

  function saveLocalTodos() {
    {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  function getLocalTodos() {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>My Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        fillteredTodos={fillteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
