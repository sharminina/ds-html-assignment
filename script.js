var showUserName;
/*_____CODE FOR DATA TABLE POPULATION WITH FORM DATA */
function loadTableData() {
  const stored = JSON.parse(localStorage.getItem('formData')) || [];
  const tbody = document.querySelector('#dataTable2 tbody');
  tbody.innerHTML = '';

  stored.forEach((entry, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.phone}</td>
      <td>${entry.department}</td>
      <td>${entry.skills.join(', ')}</td>
      <td>${entry.dob}</td>
      <td>${entry.bio}</td>
    
      <td>${entry.employment}</td>
      <td>${entry.fromDate} - ${entry.toDate}</td>
      <td>
        <button class="edit" onclick="editEntry(${index})">Edit</button>
        <button class="delete" onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
//delete table data row
function deleteEntry(index) {
  const stored = JSON.parse(localStorage.getItem('formData')) || [];
  if (confirm(`Are you sure you want to delete "${stored[index].name}"?`)) {
    stored.splice(index, 1); // Remove from array
    localStorage.setItem('formData', JSON.stringify(stored));
    window.location.reload();
  }
}
//edit table data modal form
function editEntry(index) {
  const stored = JSON.parse(localStorage.getItem('formData')) || [];
  const entry = stored[index];

  document.getElementById('editIndex').value = index;
  document.getElementById('editName').value = entry.name;
  document.getElementById('editPhone').value = entry.phone;
  document.getElementById('editDepartment').value = entry.department;
  document.getElementById('editDob').value = entry.dob;
  document.getElementById('editBio').value = entry.bio;
  document.getElementById('editSubscribe').checked = entry.subscribe;
  document.getElementById('editFromDate').value = entry.fromDate;
  document.getElementById('editToDate').value = entry.toDate;

  // Skills
  Array.from(document.getElementById('editSkills').options).forEach(opt => {
    opt.selected = entry.skills.includes(opt.value);
  });

  // Employment
  document.querySelectorAll('input[name="editEmployment"]').forEach(rb => {
    rb.checked = rb.value === entry.employment;
  });

  document.getElementById('editModal').style.display = 'flex';
  //data load in modal
  document.getElementById('editForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const index = document.getElementById('editIndex').value;
  const updatedData = {
    name: document.getElementById('editName').value,
    phone: document.getElementById('editPhone').value,
    department: document.getElementById('editDepartment').value,
    skills: Array.from(document.getElementById('editSkills').selectedOptions).map(o => o.value),
    dob: document.getElementById('editDob').value,
    bio: document.getElementById('editBio').value,
    subscribe: document.getElementById('editSubscribe').checked,
    employment: document.querySelector('input[name="editEmployment"]:checked')?.value,
    fromDate: document.getElementById('editFromDate').value,
    toDate: document.getElementById('editToDate').value,
  };

  const stored = JSON.parse(localStorage.getItem('formData')) || [];
  stored[index] = updatedData;
  localStorage.setItem('formData', JSON.stringify(stored));
  closeEditModal();
 window.location.reload();
});
}
//edit modal data population

function closeEditModal() {
  const modal = document.getElementById('editModal');
  modal.style.animation = 'fadeOut 0.3s ease-in-out';
  setTimeout(() => {
    modal.style.display = 'none';
    modal.style.animation = 'fadeIn 0.3s ease-in-out';
  }, 300);
}

/* Add this to your CSS animations */




$(function () {
  const validUser = "testUser";
  const validPass = "MySecret@123";

  // Check auth on protected pages
  const isLoginPage = location.pathname.includes("index.html");

  if (!isLoginPage && localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }

  if (isLoginPage) {
    // Show/hide password
    $("#togglePassword").on("change", function () {
      $("#password").attr("type", this.checked ? "text" : "password");
    });

    // Login handler
    $("#login-form").on("submit", function (e) {
      e.preventDefault();
      const user = $("#username").val().trim();
      const pass = $("#password").val().trim();
   
    

      if (user === validUser && pass === validPass) {
        localStorage.setItem("loggedIn", "true");
         localStorage.setItem("userName", user);
        
        window.location.href = "home.html";
        
       
        
      } 
      else if (!user || !pass) {
        $("#error-message").text("Please fill in both fields.");
        return;
      }
      /*If invalid user name or password */
      else {
        $("#error-message").text("Invalid username or password.");
        $("#password").val("");
        $("#username").val("");
        $("#togglePassword").prop("checked", false);
      
      }
    });

    return; // skip the rest
  }

  if (!window.location.pathname.includes("index.html")) {
    showUserName = localStorage.getItem("userName") || "User";
     $("#userMsg").text(`Welcome, ${showUserName}!`);
  if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "index.html";
  }
 
  // Apply stored theme
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedNav = localStorage.getItem("nav") || "top";

  $('body').removeClass().addClass(`${savedTheme}-theme`);
  if (savedNav === "side") {
    $('body').addClass("side-nav");
  } else {
    $('body').removeClass("side-nav");
  }

  // Pre-fill selects if on config page
  $('#theme-select').val(savedTheme);
  $('#nav-select').val(savedNav);

  // Theme select logic
  $('#theme-select').on('change', function () {
    const selected = $(this).val();
    localStorage.setItem('theme', selected);
    $('body').removeClass().addClass(`${selected}-theme`);
    if (localStorage.getItem("nav") === "side") {
      $('body').addClass("side-nav");
    }
  });

  // Nav style select logic
  $('#nav-select').on('change', function () {
    const selected = $(this).val();
    localStorage.setItem('nav', selected);
    $('body').toggleClass("side-nav", selected === "side");
  });

  // Logout
  $('#logout-btn').on('click', function () {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
  });
}

/**CODE FOR THE SITE DATA PAGE */
$(document).ready(function() {
 
  // Fetch data from a dummy API
  $.get('https://jsonplaceholder.typicode.com/users', function(data) {
    data.forEach(function(user) {
      $('#dataTable tbody').append(`
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>
            <button class="view" onclick="viewUser(${user.id})">View</button>
            <button class="edit" onclick="editUser(${user.id})">Edit</button>
            <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            <button class="export" onclick="exportData()">Export</button>
          </td>
        </tr>
      `);
    });
  });

  // Export table data to Excel
  window.exportData = function() {
    const table = document.getElementById('dataTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'data.xlsx');
  };

  // View user details
  window.viewUser = function(id) {
    alert('View user with ID: ' + id);
  };

  // Edit user details
  window.editUser = function(id) {
    alert('Edit user with ID: ' + id);
  };

  // Delete user
  window.deleteUser = function(id) {
    alert('Delete user with ID: ' + id);
  };
}

);
//add user info form code------

// Load saved data from localStorage (if any)
let savedData = JSON.parse(localStorage.getItem('formData')) || [];


console.log('Data from previous submissions:', savedData);
const autocompleteValues = ["Developer", "Designer", "Manager", "Tester"];

    document.getElementById('bio').addEventListener('input', function () {
      const value = this.value.toLowerCase();
      const list = document.getElementById('autocomplete');
      list.innerHTML = '';

      if (value) {
        const matches = autocompleteValues.filter(item => item.toLowerCase().includes(value));
        matches.forEach(match => {
          const div = document.createElement('div');
          div.className = 'autocomplete-item';
          div.textContent = match;
          div.onclick = () => {
            document.getElementById('bio').value = match;
            list.innerHTML = '';
          };
          list.appendChild(div);
        });
      }
    });

// On form submit
document.getElementById('mainForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  

  let valid = true;
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const department = document.getElementById('department').value;
      const skills = Array.from(document.getElementById('skills').selectedOptions).map(o => o.value);
      
  const dob = document.getElementById('dob').value;
  const bio = document.getElementById('bio').value;
  const subscribe = document.getElementById('subscribe').checked;
  const employment = document.querySelector('input[name="employment"]:checked');
  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;

  if (!name) {
    document.getElementById('error-name').textContent = 'Name is required.';
    valid = false;
  }
  if (!phone || phone.length < 11 || !/^[0-9]+$/.test(phone)) {
    document.getElementById('error-phone').textContent = 'Valid 11-digit phone number is required.';
    valid = false;
  }
  if (!department) {
    document.getElementById('error-department').textContent = 'Select a department.';
    valid = false;
  }
  if (skills.length === 0) {
    document.getElementById('error-skills').textContent = 'Select at least one skill.';
    valid = false;
  }

  if (!dob) {
  document.getElementById('error-dob').textContent = 'Date of birth is required.';
  valid = false;
} else {
  const today = new Date().toISOString().split('T')[0];
  if (dob === today) {
    document.getElementById('error-dob').textContent = 'DOB cannot be today\'s date.';
    valid = false;
  }
}
  if (!employment) {
    document.getElementById('error-employment').textContent = 'Employment status is required.';
    valid = false;
  }

  if (!valid) return;

  const formData = {
    name, phone, department, skills, dob, bio,
    subscribe, employment: employment.value, fromDate, toDate
  };

  // Save to array and localStorage
  savedData.push(formData);
  localStorage.setItem('formData', JSON.stringify(savedData));

  alert('Form submitted successfully!');
  this.reset();
  window.location.reload();
  document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
});

//code for adding edit and delete functions to table data





});
