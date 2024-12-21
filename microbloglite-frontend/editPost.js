


let darkmode = localStorage.getItem("darkmode");
let themeChanger = document.getElementById("themeChanger");

function enableDarkmode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  themeChanger.innerText = "Light";
    themeChanger.className = "btn btn-dark rounded-5 ms-2 mb-2"
     header.className = "container-fluid bg-body-secondary text-light py-4 border"
}

function disableDarkmode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
  themeChanger.innerText = "Dark";
  themeChanger.className = "btn btn-light rounded-5 ms-2 mb-2"
  header.className = "container-fluid bg-body-tertiary text-light py-4 border"
}

if (darkmode === "active") enableDarkmode();

themeChanger.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  // darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  // console.log(themeChanger)
  if (darkmode !== "active") {
    enableDarkmode();
  } else {
    disableDarkmode();
  }
});

console.log(themeChanger);