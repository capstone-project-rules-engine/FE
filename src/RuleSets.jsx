import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './styles.css';

function RuleSets() {
  const [searchInput, setSearchInput] = useState("");
  const [ruleSets, setRuleSets] = useState([]);

  // Sample data
  const sampleData = [
    { number: 1, ruleSet: "Rule Set 1", condition: "Condition 1", action: "Action 1" },
    { number: 2, ruleSet: "Rule Set 2", condition: "Condition 2", action: "Action 2" },
  ];

  useEffect(() => {
    setRuleSets(sampleData);
  }, []);

  const handleAddRuleSet = () => {
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDeleteRuleSet = (index) => {
    Swal.fire({
      title: "Delete Rule Set",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRuleSets = [...ruleSets];
        updatedRuleSets.splice(index, 1);
        setRuleSets(updatedRuleSets);
        Swal.fire("Deleted!", "The rule set has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="toolbar">
        <h1>Rule Set</h1>
        <div className="toolbar-right">
          <button onClick={handleAddRuleSet}>Add Rule Set</button>
          <input
            type="text"
            id="searchInput"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Rule Set</th>
            <th>Condition</th>
            <th>Action</th>
            <th>Burger Menu</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {ruleSets.map((data, index) => (
            <tr key={index}>
              <td>{data.number}</td>
              <td>{data.ruleSet}</td>
              <td>{data.condition}</td>
              <td>{data.action}</td>
              <td>
                <button onClick={() => handleDeleteRuleSet(index)}>☰</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RuleSets;