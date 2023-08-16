document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addRuleSet");
    const searchInput = document.getElementById("searchInput");
    const tableBody = document.getElementById("tableBody");


    // Sample data
    const sampleData = [
        { number: 1, ruleSet: "Rule Set 1", condition: "Condition 1", action: "Action 1" },
        { number: 2, ruleSet: "Rule Set 2", condition: "Condition 2", action: "Action 2" },
        // ... Tambahkan lebih banyak data jika diinginkan
    ];

    // Fungsi untuk menambahkan satu baris data ke dalam tabel
    function addRowToTable(data) {
        const row = tableBody.insertRow();
        const numberCell = row.insertCell(0);
        const ruleSetCell = row.insertCell(1);
        const conditionCell = row.insertCell(2);
        const actionCell = row.insertCell(3);
        const burgerMenuCell = row.insertCell(4);

        numberCell.textContent = data.number;
        ruleSetCell.textContent = data.ruleSet;
        conditionCell.textContent = data.condition;
        actionCell.textContent = data.action;

        const burgerButton = document.createElement("button");
        burgerButton.textContent = "☰";
        burgerButton.className = "burger-menu";
        burgerMenuCell.appendChild(burgerButton);

        burgerButton.addEventListener("click", (event) => {
            toggleBurgerMenu(event.currentTarget, row);
        });
    }

    // Inisialisasi tabel dengan sample data
    sampleData.forEach(data => addRowToTable(data));



    let ruleSets = [];
    let ruleSetNumber = 1;

    // addButton.addEventListener("click", () => {
    //     addRuleSet();
    // });


    addButton.addEventListener("click", () => {
        window.location.href = "addRuleSet.html";
    });



    searchInput.addEventListener("keyup", () => {
        searchTable();
    });

    function addRuleSet() {
        const row = tableBody.insertRow();
        const numberCell = row.insertCell(0);
        const ruleSetCell = row.insertCell(1);
        const conditionCell = row.insertCell(2);
        const actionCell = row.insertCell(3);
        const burgerMenuCell = row.insertCell(4);

        numberCell.textContent = ruleSetNumber++;
        ruleSetCell.textContent = "Your Rule Set";
        conditionCell.textContent = "Your Condition";
        actionCell.textContent = "Your Action";

        const burgerButton = document.createElement("button");
        burgerButton.textContent = "☰";
        burgerButton.className = "burger-menu";
        burgerMenuCell.appendChild(burgerButton);

        burgerButton.addEventListener("click", (event) => {
            toggleBurgerMenu(event.currentTarget, row);
        });
    }

    function toggleBurgerMenu(burgerButton, row) {
        const menu = document.getElementById("burgerDropdown");
        if (menu) menu.remove();

        const dropdown = document.createElement("div");
        dropdown.id = "burgerDropdown";
        dropdown.className = "burger-dropdown";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        dropdown.appendChild(editButton);

        editButton.addEventListener("click", () => {
            const rowData = {
                number: row.cells[0].textContent.trim(),
                ruleSet: row.cells[1].textContent.trim(),
                condition: row.cells[2].textContent.trim(),
                action: row.cells[3].textContent.trim()
            };
            localStorage.setItem("editData", JSON.stringify(rowData));
            window.location.href = "editRuleSet.html";
        });


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        dropdown.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
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
                    tableBody.deleteRow(row.rowIndex - 1);
                    dropdown.remove();
                    Swal.fire(
                        'Deleted!',
                        'The rule set has been deleted.',
                        'success'
                    );
                }
            });
        });

        burgerButton.parentElement.appendChild(dropdown);
    }

    function searchTable() {
        const filter = searchInput.value.toUpperCase();
        const rows = tableBody.getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            let match = false;

            for (let j = 0; j < cells.length - 1; j++) {
                const cell = cells[j];
                if (cell) {
                    if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
                        match = true;
                        break;
                    }
                }
            }
            rows[i].style.display = match ? "" : "none";
        }
    }



});