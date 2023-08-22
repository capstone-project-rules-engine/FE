import * as React from "react";
import { Layout } from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    getRuleset();
  }, []);

  async function getRuleset() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/static`);
      console.log(res.data.db);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        action: row.cells[3].textContent.trim(),
      };
      localStorage.setItem("editData", JSON.stringify(rowData));
      navigate(`/editruleset/${data.id}`);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    dropdown.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      Swal.fire({
        title: "Delete Rules Set",
        text: "Are you sure you want to delete? If you delete, it will be removed permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // You need to handle the deletion of the row here
          // tableBody.deleteRow(row.rowIndex - 1);
          dropdown.remove();
          Swal.fire("Deleted!", "The rule set has been deleted.", "success");
        }
      });
    });

    burgerButton.parentElement.appendChild(dropdown);
  }


  function handleSearchChange(event) {
    setSearchInput(event.target.value);
  }

   function handleEdit(params){
    navigate(`/rule/${params}`)
  }
  return (
    <Layout>
      <section className="layout">
        <div className="toolbar">
          <h1>Rule Set</h1>
          <div className="toolbar-right">
            <button
              className="add-button"
              onClick={() => navigate("/addruleset")}
            >
              tambah data
            </button>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Number</th>
              <th style={{ width: "30%" }}>Rule Set</th>
              <th style={{ width: "20%" }}>Condition</th>
              <th style={{ width: "20%" }}>Action</th>
              <th style={{ width: "5%" }}>Menu</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {data?.db?.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.endpoint}</td>
                  <button onClick={()=>handleEdit(data.endpoint)}>
                    edit
                  </button>
                </tr>
              ))}
          </tbody>
        </table>

        {process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE}
      </section>
    </Layout>
  );
};

export default Home;
