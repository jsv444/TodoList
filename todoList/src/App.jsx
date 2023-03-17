import { useEffect, useState } from "react";
import "./App.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { width } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { createTheme } from "@mui/material/styles";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import axios from "axios";
import { apiUrl } from "./config";

function App() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Function to add a new todo item to the list
  const addTodo = (newTodo) => {
    axios
      .get(`${apiUrl}`)
      .then((response) => {
        console.log(response.data);
        setTodos([...todos, response.data]); // Update the state of the todo list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to remove a todo item from the list by its ID
  const removeTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  // Function to toggle the display of the form used to add new todo items
  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  //Gets the current todo items from the db
  useEffect(() => {
    axios
      .get(`${apiUrl}`)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Color theme for button
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0597F2",
      },
    },
  });

  return (
    <div className="todo-wrapper">
      <TodoList todos={todos} removeTodo={removeTodo} />
      <Button theme={theme} variant="contained" onClick={handleButtonClick}>
        {showForm ? "Close" : "Add new To-Do item"}
      </Button>
      {showForm && <TodoForm setTodos={setTodos} addTodo={addTodo} />}
    </div>
  );
}

export default App;
