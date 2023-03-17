import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import "../index.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
import { apiUrl } from "../config";

function TodoList({ removeTodo }) {

  const [listEmpty, setListEmpty] = useState(false); // If list is empty show paragraph, else show todo items

  const [todos, setTodos] = useState([]); //Updates the todo state

  const [numOfItems, setNumOfItems] = useState(0); // Used for badge content to display number of items

  //Checks if database is populated or empty
  useEffect(() => {
    console.log("Checking if db is empty");
    axios
      .get(`${apiUrl}`)
      .then((response) => {
        setTodos(response.data); //Update todo state

        setNumOfItems(response.data.length); //used to display number of items in the list

        setListEmpty(response.data.length === 0); // checks if the database is empty. if list is empty it will show a paragraph, else it will show the todo items
      })
      //error handling
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Badge badgeContent={numOfItems} color="primary">
        <h1>My To-Do List</h1>
      </Badge>

      <div className="list-div">
        
        {/* uses the setListEmpty to show either a p or the todo list  */}

        {listEmpty ? (
          <p>
            Nothing to do today 🙏 <br />
            Add a new task below
          </p>
        ) : (
          <ul className="list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TodoList;
