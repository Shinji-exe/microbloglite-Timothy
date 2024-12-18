/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

const forms = document.getElementById("forms");
const fullName = document.getElementById("fullName");
const usernameField = document.getElementById("usernameField");
const emailField = document.getElementById("emailField");
const imageFile = document.getElementById("imageProfile");

loginForm.onsubmit = function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // We can use loginForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  // Disables the button after the form has been submitted already:
  loginForm.loginButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  login(loginData);
};

async function makeProfile(event) {
  event.preventDefault();
  let signUpData = {
    fullName: forms.fullName.value.trim(),
    username: forms.usernameField.value.trim(),
    email: forms.emailField.value.trim(),
    password: forms.passwordField.value.trim(),
    bio: forms.bio.value.trim(),
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    let promise = fetch("http://localhost:5005/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error code", error.message);
  }
}

let darkmode = localStorage.getItem("darkmode");
let themeChanger = document.getElementById("themeChanger");

function enableDarkmode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  themeChanger.innerText = "Light";
}

function disableDarkmode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
  themeChanger.innerText = "Dark";
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
