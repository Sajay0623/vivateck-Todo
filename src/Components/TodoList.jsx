import React from 'react';
import TodoCard from './TodoCard';
 

function TodoList({ todos, onTodoClick   }) {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todo={todo}
          onClick={() => onTodoClick(index)}
          index = {index}
        
        />
       
      ))}
    </div>
  );
}

export default TodoList;
