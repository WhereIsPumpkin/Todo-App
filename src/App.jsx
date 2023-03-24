import React, { useState } from "react";
import styles from "./App.module.scss";
import moonIcon from "./images/icon-moon.svg";
import checkIcon from "./images/icon-check.svg";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTodos((prevTodos) => [...prevTodos, inputValue]);
      setInputValue("");
    }
  };

  return (
    <>
      <header>
        <h1>T O D O</h1>
        <img src={moonIcon} alt="moonIcon" />
      </header>

      <div className={styles.main}>

        <div className={styles.todoAdd}>

          <div className={styles.circleCheck}>
            <img src={checkIcon} />
          </div>

          <input
            type="text"
            placeholder="Create a new todo..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

        </div>

        {todos.length > 0 && (
          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo}>{todo}</li>
            ))}
          </ul>
        )}

      </div>

    </>
  );
}

export default App;