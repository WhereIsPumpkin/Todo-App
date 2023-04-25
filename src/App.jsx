import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.scss';
import moonIcon from './images/icon-moon.svg';
import sunIcon from './images/icon-sun.svg';
import checkIcon from './images/icon-check.svg';
import crossIcon from './images/icon-cross.svg';

function App() {
  const [filter, setFilter] = useState('all');

  const [dark, setDark] = useState(false);

  const handleClear = () => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return !todo.done;
      });
    });
  };

  const handleTodoDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    axios.delete(`https://drab-jade-adder-wrap.cyclic.app/api/projects/${id}`);
  };

  const handleTodoClick = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    axios.patch(`https://drab-jade-adder-wrap.cyclic.app/api/projects/${id}`);
  };

  const [inputValue, setInputValue] = useState('');

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('https://drab-jade-adder-wrap.cyclic.app/api/projects')
      .then((res) => {
        setTodos(res.data);
      });
  }, []);

  const [done, setDone] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          todoTask: inputValue,
          done: done,
          id: uuidv4(),
        },
      ]);
      setInputValue('');
      axios.post('https://drab-jade-adder-wrap.cyclic.app/api/projects', {
        todoTask: inputValue,
        done: done,
      });
    }
  };

  return (
    <main className={dark ? styles.dark : null}>
      <header className={dark ? styles.dark : null}>
        <div className={styles.wrapperhead}>
          <h1>T O D O</h1>
          <img
            src={dark ? sunIcon : moonIcon}
            alt={dark ? 'Sun icon' : 'Moon icon'}
            onClick={() => setDark(!dark)}
          />
        </div>
      </header>

      <div className={styles.main}>
        <div className={`${styles.todoAdd} ${dark ? styles.dark : null}`}>
          <div
            className={styles.circleCheck}
            onClick={() => setDone(!done)}
            style={
              done
                ? {
                    background:
                      'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)',
                    border: 'none',
                  }
                : null
            }
          >
            {done ? <img src={checkIcon} /> : null}
          </div>

          <input
            className={dark ? styles.dark : null}
            type="text"
            placeholder="Create a new todo..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        {todos.length > 0 ? (
          <>
            <ul className={`${styles.todoList} ${dark ? styles.dark : null}`}>
              {todos
                .filter((todo) => {
                  if (filter === 'active') {
                    return !todo.done;
                  } else if (filter === 'completed') {
                    return todo.done;
                  } else {
                    return true;
                  }
                })
                .map((todo) => (
                  <li key={uuidv4()} className={dark ? styles.dark : null}>
                    <div className={styles.liWrap}>
                      <div
                        className={styles.circleCheck}
                        onClick={() => handleTodoClick(todo.id)}
                        style={
                          todo.done
                            ? {
                                background:
                                  'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)',
                                border: 'none',
                              }
                            : null
                        }
                      >
                        {todo.done ? <img src={checkIcon} /> : null}
                      </div>

                      <span
                        style={
                          todo.done
                            ? dark
                              ? {
                                  color: '#4D5067',
                                  textDecoration: 'line-through',
                                }
                              : {
                                  textDecoration: 'line-through',
                                  color: '#D1D2DA',
                                }
                            : null
                        }
                      >
                        {todo.todoTask}
                      </span>
                    </div>

                    <img
                      src={crossIcon}
                      className={styles.crossIcon}
                      onClick={() => handleTodoDelete(todo.id)}
                    />
                  </li>
                ))}

              <li className={`${styles.lastLi} ${dark ? styles.dark : null}`}>
                <span>
                  {todos.filter((todo) => !todo.done).length} items left
                </span>

                <section
                  className={`${styles.todoFilterDesktop} ${
                    dark ? styles.dark : null
                  }`}
                >
                  <h4
                    className={filter === 'all' ? styles.active : null}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </h4>

                  <h4
                    className={filter === 'active' ? styles.active : null}
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </h4>

                  <h4
                    className={filter === 'completed' ? styles.active : null}
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </h4>
                </section>

                <span onClick={handleClear} style={{ cursor: 'pointer' }}>
                  Clear Completed
                </span>
              </li>
            </ul>

            <section
              className={`${styles.todoFilter} ${dark ? styles.dark : null}`}
            >
              <h4
                className={filter === 'all' ? styles.active : null}
                onClick={() => setFilter('all')}
              >
                All
              </h4>

              <h4
                className={filter === 'active' ? styles.active : null}
                onClick={() => setFilter('active')}
              >
                Active
              </h4>

              <h4
                className={filter === 'completed' ? styles.active : null}
                onClick={() => setFilter('completed')}
              >
                Completed
              </h4>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default App;
