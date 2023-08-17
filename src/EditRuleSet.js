import React, { useState } from "react";
import "./styles.css";

function EditRuleSet() {
  const [editedData, setEditedData] = useState(JSON.parse(localStorage.getItem("editData")) || {});

  const handleSubmit = () => {
  };

  return (
    <div>
      {/* Render the editable table */}
      {/* ... */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EditRuleSet;