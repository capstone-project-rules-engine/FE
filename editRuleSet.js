document.addEventListener("DOMContentLoaded", () => {
    const rowData = JSON.parse(localStorage.getItem("editData"));
    const tableBody = document.getElementById("tableBody");

    if (rowData) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = rowData.ruleSet;
        row.insertCell(1).textContent = rowData.action;
        row.insertCell(2).textContent = rowData.condition;
    }

    const addActionButton = document.getElementById("addAction");
    const addConditionButton = document.getElementById("addCondition");
    const submitButton = document.getElementById("submit");

    let actionRowCount = 0;
    let conditionRowCount = 0;

    addActionButton.addEventListener("click", () => {
        if (conditionRowCount > 0) {
            const row = tableBody.rows[tableBody.rows.length - conditionRowCount];
            const cell = row.cells[1];
            cell.contentEditable = "true";
            cell.className = 'editable-cell';
            cell.focus();
            conditionRowCount--;
        } else {
            addRow("Action");
            actionRowCount++;
        }
    });

    addConditionButton.addEventListener("click", () => {
        if (actionRowCount > 0) {
            const row = tableBody.rows[tableBody.rows.length - actionRowCount];
            const cell = row.cells[2];
            cell.contentEditable = "true";
            cell.className = 'editable-cell';
            cell.focus();
            actionRowCount--;
        } else {
            addRow("Condition");
            conditionRowCount++;
        }
    });

    submitButton.addEventListener("click", () => {
        submitData();
    });

    function addRow(type) {
        const row = tableBody.insertRow();

        for (let i = 0; i < 3; i++) {
            const cell = row.insertCell(i);
            cell.className = 'no-border';

            if ((type === "Action" && i === 1) || (type === "Condition" && i === 2)) {
                cell.contentEditable = "true";
                cell.className = 'editable-cell';
                cell.focus();
            }
        }
    }

    function submitData() {
        const rows = tableBody.getElementsByTagName("tr");
        let data = {
            rule: null,
            actions: [],
            conditions: []
        };

        for (let row of rows) {
            const rule = row.cells[0].textContent.trim();
            const action = row.cells[1].textContent.trim();
            const condition = row.cells[2].textContent.trim();

            if (rule) data.rule = rule;
            if (action) data.actions.push(action);
            if (condition) data.conditions.push(condition);
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "action/do_AddRuleSet.php", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(xhr.responseText); // Ini akan menampilkan respons dari server
            }
        };
        xhr.send(JSON.stringify(data));
    }

});