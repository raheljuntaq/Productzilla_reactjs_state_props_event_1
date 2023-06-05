import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import "./fonts.css";

function TodoItem({ todo, onToggle }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div>
        <p>
          <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
          {todo.title} - {todo.description}
        </p>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

function TodoList({ todos, onToggle, onDeleteCompleted }) {
  const [count, setCount] = useState(todos.filter((todo) => !todo.completed).length);

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    onToggle(id); // Call onToggle with the updated id

    const newCount = updatedTodos.filter((todo) => !todo.completed).length;
    setCount(newCount);
  };

  const handleDeleteCompleted = () => {
    onDeleteCompleted();
    setCount(todos.filter((todo) => !todo.completed).length);
  };

  return (
    <div>
      <h2>Daftar Todos : {count} Belum Selesai </h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
      <button onClick={handleDeleteCompleted} disabled={count <= 0}>
        Hapus Todos Selesai
      </button>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDeleteCompleted: PropTypes.func.isRequired,
};

function App() {
  const initialTodos = [
    {
      id: 1,
      title: "Belajar React",
      description: "Belajar Reacts Hook, Props, State, Lifecycle",
      completed: false,
    },
    {
      id: 2,
      title: "Membuat Aplikasi React",
      description: "Membuat aplikasi TODO LIST",
      completed: true,
    },
    {
      id: 3,
      title: "Membuat Aplikasi Chat",
      description: "Membuat aplikasi Chat menggunakan React dan Firebase",
      completed: false,
    },
    {
      id: 4,
      title: "Belajar Node.js",
      description: "Belajar membuat server menggunakan Node.js dan Express",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteCompletedTodos = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoList todos={todos} onToggle={handleToggleTodo} onDeleteCompleted={handleDeleteCompletedTodos} />
    </div>
  );
}

export default App;
