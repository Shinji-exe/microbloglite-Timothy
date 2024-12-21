"use strict";

const urlParams = new URLSearchParams(location.search);

let postObject = urlParams.get("_id");

const postCardArea = document.getElementById("postCardArea");

async function getAPost() {
  const loginData = getLoginData();
  try {
    let promise = fetch(`http://localhost:5005/api/posts/${postObject}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
    createPostCards(data);
  } catch (error) {
    console.error;
  }
}

getAPost();

function createPostCards(posts) {
  let card = document.createElement("div");
  card.className = "card my-3 w-75";

  let cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  card.appendChild(cardHeader);

  let cardHeaderProfileName = document.createElement("a");
  cardHeaderProfileName.href = `postDetail.html?_id=${posts._id}`;
  cardHeaderProfileName.innerText = posts.username;
  cardHeader.appendChild(cardHeaderProfileName);

  let imagePost = document.createElement("img");
  imagePost.src = posts.imagePost;
  card.appendChild(imagePost);

  let cardBody = document.createElement("div");
  let cardText = document.createElement("p");
  cardText.innerText = posts.text;
  cardBody.appendChild(cardText);
  card.appendChild(cardBody);

  let likeButton = document.createElement("button");
  likeButton.innerText = "Like";
  likeButton.addEventListener("click", async () => {});

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  let cardFooterText = document.createElement("p");
  cardFooterText.innerText = new Date(posts.createdAt);
  cardFooter.appendChild(cardFooterText);
  card.appendChild(cardFooter);

  postCardArea.appendChild(card);
}

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