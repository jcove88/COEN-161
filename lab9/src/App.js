import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  
  const fetchTodos = async () => {
    const response = await fetch('/todos');
  
    const responseTodos = await response.json();

    setTodos(responseTodos);
  };

  const insertTodo = async (todo) => {
    const response = await fetch('/todo', {
      method: 'POST',
      body: JSON.stringify({
        todo,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseTodo = await response.json();

    setTodos([...todos, responseTodo]);
    setValue('');
  };

  const updateTodo = async (completed, id) => {
    fetch(`/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          completed,
          ...todo
        };
      }
      
      return todo;
    }));
  };

  const deleteTodo = async (id) => {
    fetch(`/todo/${id}`, {
      method: 'DELETE',
    });

    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChange = (e) => {
    setValue(e.target.value); 
  };

  const onSubmit = (e) => {
    insertTodo(value);
    
    e.preventDefault();
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
      </header>
      <section className="App-body">
        <form className="App-form" onSubmit={onSubmit}>
          <input className="App-to-do-input" onChange={onChange} type="text" value={value} />
          <input type="submit" />
        </form>
        <ul className="App-to-do-list">
          {todos.map(todo => (<li className="App-to-do" key={todo.id}>
            <input checked={todo.completed} onChange={() => { updateTodo(!todo.completed, todo.id); }} type="checkbox" />
            <span>{todo.description}</span>
            <span className="App-to-do-delete" onClick={() => { deleteTodo(todo.id); }}>&#x1F5D1;</span>
          </li>))}
        </ul>
      </section>
    </div>
  );
}

export default App;
