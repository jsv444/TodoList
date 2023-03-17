import React from "react";
import axios from "axios";
import "../index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { apiUrl } from "../config";

function TodoItem({ todo, removeTodo }) {

  //Removes the selected todo field
  const handleRemoveClick = () => {
    axios
      .delete(`${apiUrl}/${todo.id}`)
      .then(() => {
        console.log(`removed item ${todo.id}`);
        removeTodo(todo.id);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting todo", error);
      });
  };

  return (
    <div className="todo-list-item">
      <li>
        {todo.task}
      </li>
      <IconButton className="delete-btn" >
          <DeleteIcon  onClick={handleRemoveClick} />
        </IconButton>

    </div>
  );
}

export default TodoItem;
