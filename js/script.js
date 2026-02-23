/*eslint-env browser*/

// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [12345678, "John Jones", 1234, "jjones@vectorcapr.com", "Executive"],
    [23456789, "Sally Smith", 2345, "ssmith@vectorcapr.com", "Administrative"],
    [87654321, "Brad Brown", 3456, "bbrown@vectorcapr.com", "Marketing"],
    [98765432, "Cece Chen", 4567, "cchen@vectorcapr.com", "Engineering"],
    [10101010, "Dan Dan", 5678, "ddan@vectorcapr.com", "Sales"]
  ];
  // CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
  // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
  if (localStorage.getItem("employees")) {
    employees = JSON.parse(localStorage.getItem("employees"));
  }
  // GET DOM ELEMENTS
  let form = document.getElementById("addForm");
  let empTable = document.getElementById("empTable");
  let empCount = document.getElementById("empCount");
  let tbody = empTable.querySelector("tbody");
  // BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
  buildGrid();
  
  // ADD EMPLOYEE
  form.addEventListener("submit", (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let extension = document.getElementById("extension").value;
    let email = document.getElementById("email").value;
    let department = document.getElementById("department").value;
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = [Number(id),name,Number(extension),email,department];
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);
    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById("id").focus();
  });
  
  // DELETE EMPLOYEE
  empTable.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    // CONFIRM THE DELETE
    if (confirm("Are you sure you want to delete? ")) {
      // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
      let rowIndex = e.target.parentNode.parentNode.rowIndex;
      // REMOVE EMPLOYEE FROM ARRAY
      employees.splice(rowIndex - 1, 1);
      // BUILD THE GRID
      buildGrid();
    }
  });
  
  // BUILD THE EMPLOYEES GRID
  function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.removeChild(tbody);
    // REBUILD THE TBODY FROM SCRATCH
    tbody = document.createElement("tbody");
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let emp of employees) {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp[0]}</td>
        <td>${emp[1]}</td>
        <td>${emp[2]}</td>
        <td>${emp[3]}</td>
        <td>${emp[4]}</td>
        <td>
        <button type="button" class="btn btn-danger btn-sm">X</button>
        </td>`;
      tbody.appendChild(row);
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);
    // UPDATE EMPLOYEE COUNT
    empCount.textContent = "(" + employees.length + ")";
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem("employees", JSON.stringify(employees));
  }