
//function to retrive entries
const retriveEntries = () => {
  let entries = localStorage.getItem("user-Entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};


// 
const displayEntries = () => {
    const entries =retriveEntries();
    const rowEntries = entries.map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const acceptTaC = `<td class="td">${entry.acceptTaC}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTaC}</tr>`;
      return row;
    }).join("\n");
    const table = `<table class="table-auto" border="3"><tr>
                   <th class="th">Name</th>
                   <th class="th">Email</th>
                   <th class="th">Password</th>
                   <th class="th">dob</th>
                   <th class="th">Accepted Terms?</th>
                   </tr>${rowEntries}</table>`

    let details = document.getElementById("user-entries");

    details.innerHTML=table;

}


const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;

    const acceptTaC = document.getElementById("checkbox").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTaC
    };

    userEntries.push(entry);

    localStorage.setItem("user-Entries", JSON.stringify(userEntries));
    displayEntries();
}

function getAge(today, birthDate) {
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 ){
    age--;
  }else if(m === 0 && today.getDate() < birthDate.getDate()) {
    age--;
  }
  return age;
}

const dobcheck = () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");

  let dob = new Date(year, month, date);
  let Today = new Date();

  age = getAge(Today, dob);
    dateELE.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  if (age < 18 || age > 55) {
    dateELE.setCustomValidity("Your age is not lies between 18 and 55");
    dateELE.style.border = "2px solid red";
    return;
  } else {
    dateELE.setCustomValidity("");
  }
}

let dateELE = document.getElementById("dob");
dateELE.addEventListener("input", dobcheck);
let userEntries = retriveEntries();
displayEntries();
let userForm = document.getElementById("registration-form");
userForm.addEventListener("submit",saveUserForm);
displayEntries();
