import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { apiUrl } from "../config";

function TodoForm({ addTodo, setTodos }) {
  //initial values for the task
  const [todo, setTodo] = useState({
    task: "",
  });

  // This function is called when there is a change in the input field of the form.
  function handleChange(e) {
    setTodo({ ...todo, task: e.target.value });
  }

  //This function does an API call to the backend "TodoApi" with the todo state. It the reloads the page to display the submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}`, todo)
      .then((response) => {
        console.log("Todo added", response.data);
        addTodo(response.data);
        setTodo({
          task: "",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding todo", error);
      });
  };

  //Color theme for button
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0597F2",
      },
    },
  });

  return (
    <form className="todo-form">
      <h2>Enter a new to do item</h2>
      <input
        type="text"
        name="task"
        value={todo.task}
        onChange={handleChange}
        placeholder="Please enter a task"
      />
      <Button
        theme={theme}
        className="submit"
        variant="contained"
        onClick={handleSubmit}
        type="submit"
        disabled={!todo.task}
      >
        SUBMIT
      </Button>
    </form>
  );
}

export default TodoForm;
