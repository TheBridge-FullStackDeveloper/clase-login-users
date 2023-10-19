const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("btn");
const usersDiv = document.querySelector(".users");
const loginDiv = document.querySelector(".login");
const loginNav = document.getElementById("loginNav");
const usersNav = document.getElementById("usersNav");

let token = localStorage.getItem("token") || "";

const login = async (e) => {
  e.preventDefault();
  try {
    const user = {
      email: email.value,
      password: password.value,
    };
    const res = await axios.post("https://reqres.in/api/login", user);
    token = res.data.token;
    localStorage.setItem("token", token);
    logged();
  } catch (error) {
    console.error(error);
  }
};

//escondemos menu navegación y vistas
function hideViews() {
  loginDiv.classList.add("d-none");
  loginNav.classList.add("d-none");
  usersDiv.classList.add("d-none");
  usersNav.classList.add("d-none");
}

//mostramos opcion de usersNav
function showNavLogged() {
  usersNav.classList.remove("d-none");
}

//escondemos todas las vistas, mostramos la opcion del nav users y mostramos la vista usuarios
async function getUsers() {
  try {
    hideViews();
    showNavLogged();
    usersDiv.classList.remove("d-none");
    const res = await axios.get("https://reqres.in/api/users", {
      headers: {
        Authorization: token,
      },
    });
    const users = res.data.data;
    printUsers(users);
  } catch (error) {
    console.error(error);
  }
}

function printUsers(users) {
  users.forEach((user) => {
    usersDiv.innerHTML += `
       <div class="card border-primary mb-3" style="width: 20rem;">
  <div class="card-header">${user.first_name}</div>
  <div class="card-body">
    <h4 class="card-title">${user.email}</h4>
    <img src="${user.avatar}" />
  </div>
</div>
       `;
  });
}

function logged() {
  if (token.length > 0) {
    hideViews();
    showNavLogged();
    getUsers();
  }
}
logged();

btn.addEventListener("click", login);
usersNav.addEventListener("click", getUsers);
