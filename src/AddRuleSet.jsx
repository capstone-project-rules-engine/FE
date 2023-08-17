import React, { useState } from "react";
import "./styles.css";

function AddRuleSet() {
  const [conditionRows, setConditionRows] = useState([{ attribute: "", operator: "", label: "" }]);
  const [actionRows, setActionRows] = useState([{ body: "", type: "" }]);

  const handleAddCondition = () => {
    setConditionRows([...conditionRows, { attribute: "", operator: "", label: "" }]);
  };

  const handleAddAction = () => {
    setActionRows([...actionRows, { body: "", type: "" }]);
  };

  const handleDeleteCondition = (index) => {
    const updatedConditions = [...conditionRows];
    updatedConditions.splice(index, 1);
    setConditionRows(updatedConditions);
  };

  const handleDeleteAction = (index) => {
    const updatedActions = [...actionRows];
    updatedActions.splice(index, 1);
    setActionRows(updatedActions);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <div>
      <div className="toolbar">
        <h1>Add Rule Set</h1>
        <div className="toolbar-right">
        </div>
      </div>

      <form id="ruleSetForm">
        <div>
          <h2>Name</h2>
          <input type="text" name="name" />
        </div>

        <div>
          <h2>Condition</h2>
          {conditionRows.map((condition, index) => (
            <div key={index} className="condition-row">
              <input type="text" name={`condition-attribute-${index}`} placeholder="Attribute" />
              <select name={`condition-operator-${index}`}>
                <option value="equal">Equal</option>
                <option value="not-equal">Not Equal</option>
                {/* Add more operator options */}
              </select>
              <input type="text" name={`condition-label-${index}`} placeholder="Label" />
              <button onClick={() => handleDeleteCondition(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleAddCondition}>Add Condition</button>
        </div>

        <div>
          <h2>Action</h2>
          {actionRows.map((action, index) => (
            <div key={index} className="action-row">
              <input type="text" name={`action-body-${index}`} placeholder="Body" />
              <input type="text" name={`action-type-${index}`} placeholder="Type" />
              <button onClick={() => handleDeleteAction(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleAddAction}>Add Action</button>
        </div>

        <div>
          <h2>Body</h2>
          <input type="text" name="body" />
          <select name="dropdown-menu">
            {/* Dropdown menu options */}
          </select>
          <input type="text" name="dropdown-field" />
          <button>Delete</button>
          <button>Add</button>
        </div>

        <button id="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default AddRuleSet;