document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addAction");
    const submitButton = document.getElementById("submit");
    const conditionContainer = document.getElementById("conditionContainer");
    const actionContainer = document.getElementById("actionContainer");
    const ruleSetForm = document.getElementById("ruleSetForm");
    const deleteButton = document.getElementById("deleteButton");
    const addBodyButton = document.getElementById("addBodyData");

    addBodyButton.addEventListener("click", () => {
        addBodyData();
    });

    deleteButton.addEventListener("click", () => {
        deleteBodyData();
    });

    addButton.addEventListener("click", () => {
        addRow(actionContainer, "Action");
    });

    addConditionButton.addEventListener("click", () => {
        addRow(conditionContainer, "Condition");
    });

    submitButton.addEventListener("click", () => {
        submitData();
    });

    ruleSetForm.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-condition")) {
            removeRow(event.target.closest(".condition-row"));
        }
        if (event.target.classList.contains("remove-action")) {
            removeRow(event.target.closest(".action-row"));
        }
    });

    function addCondition() {
        const conditionSection = document.getElementById("conditionSection");
        const conditionRow = document.createElement("div");
        conditionRow.className = "condition-row";

        const attributeInput = createInputElement("text", "Attribute");
        const operatorDropdown = createOperatorDropdown();
        const labelInput = createInputElement("text", "Label");
        const deleteButton = createDeleteButton();

        conditionRow.appendChild(attributeInput);
        conditionRow.appendChild(operatorDropdown);
        conditionRow.appendChild(labelInput);
        conditionRow.appendChild(deleteButton);

        conditionSection.appendChild(conditionRow);
    }

    function createInputElement(type, placeholder) {
        const input = document.createElement("input");
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    function createOperatorDropdown() {
        const dropdown = document.createElement("select");
        dropdown.className = "operator-dropdown";
        const operators = ["=", "!=", "<", ">"];
        operators.forEach(operator => {
            const option = document.createElement("option");
            option.value = operator;
            option.text = operator;
            dropdown.add(option);
        });
        return dropdown;
    }

    function createDeleteButton() {
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-button";
        button.addEventListener("click", () => {
            deleteConditionRow(button.parentNode);
        });
        return button;
    }

    function deleteConditionRow(row) {
        row.parentNode.removeChild(row);
    }

    function addBodyData() {
        const tableBody = document.getElementById("tableBody");
        const newRow = tableBody.insertRow();

        const bodyCell = newRow.insertCell(0);
        const dropdownCell = newRow.insertCell(1);
        const deleteCell = newRow.insertCell(2);

        const bodyInput = document.createElement("input");
        bodyInput.type = "text";
        bodyInput.className = "body-input";

        const dropdownMenu = document.createElement("select");
        dropdownMenu.className = "dropdown-menu";
        // Tambahkan pilihan dropdown sesuai kebutuhan
        const option1 = document.createElement("option");
        option1.value = "Option 1";
        option1.text = "Option 1";
        dropdownMenu.add(option1);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        bodyCell.appendChild(bodyInput);
        dropdownCell.appendChild(dropdownMenu);
        deleteCell.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            deleteRow(newRow);
        });
    }

    function deleteRow(row) {
        row.parentNode.removeChild(row);
    }

    const addConditionButton = document.getElementById("addCondition");

    addConditionButton.addEventListener("click", () => {
        addCondition();
    });

    function addRow(container, type) {
        const row = document.createElement("div");
        row.className = type.toLowerCase() + "-row";

        if (type === "Action") {
            row.innerHTML = `
                <label for="${type.toLowerCase()}Body">${type} Body:</label>
                <input type="text" class="${type.toLowerCase()}-body" name="${type.toLowerCase()}Body[]">
                <button class="remove-${type.toLowerCase()}">Remove</button>
            `;
        } else if (type === "Condition") {
            row.innerHTML = `
                <label for="${type.toLowerCase()}Attribute">${type} Attribute:</label>
                <input type="text" class="${type.toLowerCase()}-attribute" name="${type.toLowerCase()}Attribute[]">
                <label for="${type.toLowerCase()}Operator">${type} Operator:</label>
                <input type="text" class="${type.toLowerCase()}-operator" name="${type.toLowerCase()}Operator[]">
                <label for="${type.toLowerCase()}Label">${type} Label:</label>
                <input type="text" class="${type.toLowerCase()}-label" name="${type.toLowerCase()}Label[]">
                <button class="remove-${type.toLowerCase()}">Remove</button>
            `;
        }

        container.appendChild(row);
    }

    function deleteBodyData() {
        const bodyInput = document.getElementById("body");
        const dropdownMenu = document.getElementById("dropdownMenu");

        bodyInput.value = ""; // Menghapus isi field Body
        dropdownMenu.selectedIndex = 0; // Mengatur dropdown ke opsi pertama
    }

    function submitData() {
        const formData = new FormData(ruleSetForm);

        const data = {
            name: formData.get("name"),
            conditions: [],
            actions: []
        };

        const conditionAttributes = formData.getAll("conditionAttribute[]");
        const conditionOperators = formData.getAll("conditionOperator[]");
        const conditionLabels = formData.getAll("conditionLabel[]");

        for (let i = 0; i < conditionAttributes.length; i++) {
            data.conditions.push({
                attribute: conditionAttributes[i],
                operator: conditionOperators[i],
                label: conditionLabels[i]
            });
        }

        const actionBodies = formData.getAll("actionBody[]");

        for (let i = 0; i < actionBodies.length; i++) {
            data.actions.push({
                body: actionBodies[i]
            });
        }

    }
});