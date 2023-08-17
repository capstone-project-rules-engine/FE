import React, { useState } from 'react'; // Impor useState dari React
import { Link } from 'react-router-dom';
import './styles.css';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddRuleSet from './AddRuleSet';

function App() {
  const [ruleSets, setRuleSets] = useState([
    { number: 1, ruleSet: "Rule Set 1", condition: "Condition 1", action: "Action 1", showDropdown: false },
    { number: 2, ruleSet: "Rule Set 2", condition: "Condition 2", action: "Action 2", showDropdown: false },
  ]);

  const [searchInput, setSearchInput] = useState('');

  const toggleBurgerMenu = (ruleNumber) => {
    const updatedRuleSets = ruleSets.map((data) => {
      if (data.number === ruleNumber) {
        return {
          ...data,
          showDropdown: !data.showDropdown // Toggle the showDropdown property
        };
      }
      return data;
    });
    setRuleSets(updatedRuleSets);
  };

  const searchTable = () => {
    const filteredRuleSets = ruleSets.filter((data) => {
      const searchData = data.ruleSet + data.condition + data.action;
      return searchData.toUpperCase().includes(searchInput.toUpperCase());
    });
    setRuleSets(filteredRuleSets); 
  };

  const addRowToTable = (data) => {
    return (
      <tr key={data.number}>
        <td>{data.number}</td>
        <td>{data.ruleSet}</td>
        <td>{data.condition}</td>
        <td>{data.action}</td>
        <td>
          <button className="burger-menu" onClick={() => toggleBurgerMenu(data.number)}>
            ☰
          </button>
          {data.showDropdown && (
            <div className="burger-dropdown">
              <button onClick={() => editRuleSet(data)}>Edit</button>
              <button onClick={() => deleteRuleSet(data)}>Delete</button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  const editRuleSet = (data) => {
    localStorage.setItem("editData", JSON.stringify(data));
    window.location.href = "editRuleSet.html";
  };

  const deleteRuleSet = (data) => {
    Swal.fire({
      title: 'Delete Rules Set',
      text: "Are you sure you want to delete? If you delete, it will be removed permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRuleSets = ruleSets.filter((item) => item.number !== data.number);
        setRuleSets(updatedRuleSets);
        Swal.fire('Deleted!', 'The rule set has been deleted.', 'success');
      }
    });
  };

  return (
    <div>
      <div className="toolbar">
        <h1>Rule Set</h1>
        <div className="toolbar-right">
          <Link to="/addRuleSet">
            <button className="add-button">Add Rule Set</button>
          </Link>
          <input
            type="text"
            id="searchInput"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
          {ruleSets.map((data) => addRowToTable(data))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
