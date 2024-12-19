"use strict";

let profileTitle = document.getElementById("profileTitle");
let postCardArea = document.getElementById("postCardArea");
let theUsername = document.getElementById("theUsername");
let biography = document.getElementById("biography");
let pfp = document.querySelector("#pfp");
let proPic = document.getElementById("proPic");
// let profileName = localStorage.getItem("username");
let loginData = getLoginData();
if (loginData) {
  profileTitle.innerText = `${loginData.username}`;
  // theUsername.innerText = `${loginData.username}`
} else {
  profileTitle.innerText = "Guest";
}

const urlParams = new URLSearchParams(location.search);

let userProfile = urlParams.get("username");

async function getProfile() {
  const loginData = getLoginData();
  try {
    let promise = fetch(`http://localhost:5005/api/users/${userProfile}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
    theUsername.innerText = data.username || "Loading...";
    biography.innerText = data.bio;
    proPic.src = data.profilePicture || "images/l60Hf.png"
    proPic.className = "proPic"
    // createPostCards(data);
  } catch (error) {
    console.error;
  }
}

getProfile();

// async function getUsersPost() {
//   const loginData = getLoginData();
//   try {
//     let promise = fetch(`http://localhost:5005/api/posts/${username}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${loginData.token}`,
//       },
//     });
//     let response = await promise;
//     let data = await response.json();
//     console.log(data);
//     theUsername.innerText = `${data.username}` || "Loading...";

//     if (data.username === postCardArea.username) createPostCards(data);
//   } catch (error) {
//     console.error;
//   }
// }

// getUsersPost();

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
