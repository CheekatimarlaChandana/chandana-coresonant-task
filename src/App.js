import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    const todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    }; 

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const handleEditTodo = (id, newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle,
          };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />&nbsp;
      <button className="add" onClick={handleAddTodo}>Add Task</button>
      <div className="abc">
        <button onClick={() => setFilter("all")} className="bcd">All</button>&nbsp;
        <button onClick={() => setFilter("completed")} className="xyz">Completed</button>&nbsp;
        <button onClick={() => setFilter("incomplete")} className="pqr">Incomplete</button>&nbsp;
      </div>
      <ul className="parent">
        {filteredTodos.map((todo) => (
          <li className="child" key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.title}
            </span>&nbsp;
            <button onClick={() => handleEditTodo(todo.id, "New Title")}>
              Edit
            </button>&nbsp;
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;