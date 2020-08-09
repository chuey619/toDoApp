console.log("connected");
let navButtons = document.querySelectorAll("li a");

const getPage = () => {
  console.log(window.location.pathname);
  if (window.location.pathname == "/") {
    localStorage.setItem("activeTab", "home");
  } else if (window.location.pathname == "/toDos/") {
    localStorage.setItem("activeTab", "todos");
  } else if (
    window.location.pathname == "/auth/login" ||
    window.location.pathname == "/auth/register"
  ) {
    localStorage.setItem("activeTab", "login");
  }
};

const nav = () => {
  navButtons.forEach((button) => {
    if (button.id === localStorage.getItem("activeTab")) {
      button.classList.add("active");
    }
  });
};

const main = () => {
  getPage();
  nav();
};
