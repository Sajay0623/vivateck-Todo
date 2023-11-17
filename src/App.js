import React from 'react';
import './App.css'; // Import your CSS styles if you have them
import TodoApp from "./Components/TodoApp" // Import your main TodoApp component
import Test from './Components/Table';
import EditCardText from './Components/EditCardText';

function App() {
  return (
    <div className="App">
      <TodoApp />
      <EditCardText/>
    </div>
  );
}

export default App;