import React, { useEffect, useState } from "react";

const EditCardText = () => {
  const updateTodo = JSON.parse(localStorage.getItem("todos"));

  return (
    <div className="edit-card-text">
      <input
        className="edit-card-input"
        type="text"
        placeholder="update a Todo"
        // onChange={handleUpdateChange}
      />
      <button className="inputbtn">Update</button>
    </div>
  );
};

export default EditCardText;
