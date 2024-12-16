/* Posts Page JavaScript */

"use strict";

let postCardArea = document.getElementById("postCardArea");

async function getAllPost() {
  const loginData = getLoginData();
  try {
    let promise = fetch("http://localhost:5005/api/posts", {
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

getAllPost();

async function getAPost(posts) {
  const loginData = getLoginData();
  try {
    let promise = fetch(`http://localhost:5005/api/posts/${posts.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error;
  }
}

async function createAPost() {
  const loginData = getLoginData();
  let newPost = {
    text: document.getElementById("tweetInput").value.trim(),
  };
  try {
    let promise = fetch("http://localhost:5005/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(newPost),
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error;
  }
}

function createPostCards(posts) {
  posts.forEach((post) => {
    let card = document.createElement("div");
    card.className = "card my-3";

    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    card.appendChild(cardHeader);

    let cardHeaderProfileName = document.createElement("a")
    cardHeaderProfileName.href = `userProfile.html?id=${post._id}`
    cardHeaderProfileName.innerText =  post.username
    cardHeader.appendChild(cardHeaderProfileName)

    let imagePost = document.createElement("img");
    imagePost.src = post.imagePost;
    card.appendChild(imagePost);

    let cardBody = document.createElement("div");
    let cardText = document.createElement("p");
    cardText.innerText = post.text;
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);

    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"
    likeButton.addEventListener("click", async ()=> {
        
    })

    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer"
    let cardFooterText = document.createElement("p");
    cardFooterText.innerText = new Date(post.createdAt);
    cardFooter.appendChild(cardFooterText);
    card.appendChild(cardFooter);

    postCardArea.appendChild(card);
  });
}

async function filterPost(params) {
  let searchValue = placehold.value;
  try {
    let promise = fetch("http://localhost:5005/api/posts");
    let response = await promise;
    let data = await response.json();
    console.log(data);
    let filteringPost = data.filter((post) => post);
  } catch (error) {
    console.error;
  }
}
