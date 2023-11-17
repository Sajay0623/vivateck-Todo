import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import EditCardText from "./EditCardText";

function TodoCard({ todo, onClick ,index }) {
  const cardClassName = `todo-card ${todo.completed ? "completed" : ""}`;
  const display = ()=>{
    
  }   
  return (
    <div className={cardClassName}  >
      <div>
        {todo.text}
        {todo.completed && <span className="completed-text">Completed</span>}
      </div>
      <div className="todo-card-button"  >
        
       
        <FaCheck onClick={()=>onClick( )} />
        <FaEdit onClick={display} />
         

         

        <MdDeleteForever color={"red"} />
      </div>
    </div>
  );
}

export default TodoCard;
