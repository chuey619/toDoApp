console.log("connected");
let navButtons = document.querySelectorAll("li a");
const nav = () => {
  navButtons.forEach((button) => {
    button.classList.remove("active");
    button.addEventListener("click", () => {
      localStorage.setItem("activeTab", event.target.id);
    });
  });
  navButtons.forEach((button) => {
    if (button.id === localStorage.getItem("activeTab")) {
      button.classList.add("active");
    }
  });
};

nav();
