import React, { useState } from "react";
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.scss";
import moonIcon from "./images/icon-moon.svg";
import checkIcon from "./images/icon-check.svg";
import crossIcon from "./images/icon-cross.svg";

function App() {

  const handleClear = () =>{
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return !todo.done
      })
    })
  }

  const [items, setItems] = useState(0);

  const handleTodoLeft = () => {
    let count = 0;
    todos.map((todo) => {
      if (!todo.done) {
        count++;
      }
    });
    setItems(count);
  };

  const handleTodoDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };


  const handleTodoClick = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    handleTodoLeft();
  }, [todos]);
  

  const [done, setDone] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          task: inputValue,
          done: done,
          id: uuidv4(),
        },
      ]);
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
          <div
            className={styles.circleCheck}
            onClick={() => setDone(!done)}
            style={
              done
                ? {
                    background:
                      "linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)",
                    border: "none",
                  }
                : null
            }
          >
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

        {todos.length > 0 ? (

          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <li key={uuidv4()}>
                <div className={styles.liWrap}>
                  <div
                    className={styles.circleCheck}
                    onClick={() => handleTodoClick(todo.id)}
                    style={
                      todo.done
                        ? {
                            background:
                              "linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)",
                            border: "none",
                          }
                        : null
                    }
                  >
                    <img src={checkIcon} />
                  </div>

                  <span
                    style={
                      todo.done
                        ? {
                            textDecoration: "line-through",
                            color: "#D1D2DA",
                          }
                        : null
                    }
                  >
                    {todo.task}
                  </span>
                </div>

                <img
                  src={crossIcon}
                  className={styles.crossIcon}
                  onClick={() => handleTodoDelete(todo.id)}
                />
              </li>
            ))}

            <li className={styles.lastLi}>
              <span>{items} items left</span>
              <span onClick={handleClear}>Clear Completed</span>
            </li>

          </ul>
        ) : null}

      </div>
    </>
  );
}

export default App;
