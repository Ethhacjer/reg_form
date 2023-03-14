const form = document.querySelector('#registration-form');
const table = document.querySelector('#user-table tbody');

// // Load user data from local storage and display it
// const loadUserData = () => {
//   // Clearing the table
//   table.innerHTML = '';

//   if (localStorage.getItem('users')) {
//     const users = JSON.parse(localStorage.getItem('users'));
//     users.forEach(user => {
//       const newRow = table.insertRow();
//       const nameCell = newRow.insertCell();
//       const emailCell = newRow.insertCell();
//       const passwordCell = newRow.insertCell();
//       const dobCell = newRow.insertCell();
//       const acceptedTermsCell = newRow.insertCell();

//       nameCell.innerText = user.name;
//       emailCell.innerText = user.email;
//       passwordCell.innerText = user.password;
//       dobCell.innerText = new Date(user.dob).toISOString().slice(0,10);
//       acceptedTermsCell.innerText = user.acceptedTerms ? 'true' : 'false';
//     });
//   }
// };

// loadUserData();
const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const accseptConditions = `<td class="td">${entry.accseptConditions}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${accseptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("tableDiv");

  // <th class="th">Name</th> inside oneMore head for name
  tableDiv.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};

// const saveUserFrom = () => {
const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let accseptConditions = document.getElementById("agree").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    accseptConditions,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const dobInput = document.querySelector('#dob');
  // const dob = document.getElementById('dob').value;
  const acceptedTerms = document.querySelector('#checkbox').checked;
  const dobInput = document.getElementById('dob');
  dobInput.addEventListener('input', validateAge);
  function validateAge() {
    const dob = new Date(dobInput.value);
    const ageInMs = Date.now() - dob.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365);
    if (ageInYears < 18 || ageInYears > 55) {
      dobInput.setCustomValidity('You must be between 18 and 55 years old to register.');
    } else {
      dobInput.setCustomValidity('');
    }
  }
  // const date = new Date(dob);
  // const nxtdate = new Date();
  // const maxidate = (new Date(nxtdate.getFullYear() - 55, nxtdate.getMonth(), nxtdate.getDate()))
  // const minidate = (new Date(nxtdate.getFullYear() - 18, nxtdate.getMonth(), nxtdate.getDate()));

  // if (date < maxidate || date > minidate) {
  //       alert('Enter a valid date of birth- between 18 and 55 years ago.');
  //       return;
  //   }

  // Create a user object with the form data
  const user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptedTerms: acceptedTerms
  };

  // Get existing users from local storage or initialize an empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Add the new user to the array
  users.push(user);

  // Save the updated array back to local storage
  localStorage.setItem('users', JSON.stringify(users));

  // Add the new row to the table
  const newRow = table.insertRow();
  const nameCell = newRow.insertCell();
  const emailCell = newRow.insertCell();
  const passwordCell = newRow.insertCell();
  const dobCell = newRow.insertCell();
  const acceptedTermsCell = newRow.insertCell();

  nameCell.innerText = name;
  emailCell.innerText = email;
  passwordCell.innerText = password;
  dobCell.innerText = new Date(user.dob).toISOString().slice(0,10);
  acceptedTermsCell.innerText = acceptedTerms ? 'true' : 'false';

  // Reset the form
  // form.reset();

  // Load and display the updated user data
  loadUserData();
});

// Clear the table and local storage when the form is reset
form.addEventListener('reset', () => {
  table.innerHTML = '';
});