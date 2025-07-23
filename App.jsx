import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddTask = () => {
    if (input.trim()) {
      if (isEditing) {
        const updatedTasks = [...tasks];
        updatedTasks[currentIndex] = input;
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setTasks([...tasks, input]);
      }
      setInput('');
    }
  };

  const handleEditTask = (index) => {
    setInput(tasks[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Reset editing state if needed
    if (isEditing && index === currentIndex) {
      setIsEditing(false);
      setInput('');
    }
  };

  return (
    <div className="app">
      <h1>📝 To-Do App with Edit</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          placeholder="Enter a task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleEditTask(index)}>✏️</button>
            <button onClick={() => handleDeleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;