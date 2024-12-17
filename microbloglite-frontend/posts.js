/* Posts Page JavaScript */

"use strict";

let postCardArea = document.getElementById("postCardArea");
let tweetInput = document.getElementById("tweetInput");
let tweetButton = document.getElementById("tweetButton");
let charCount = document.getElementById("charCount");
let theUsername = document.getElementById("theUsername");

//

function randomPlaceholders() {
  let placeholders = [
    "What's on your mind?",
    "Spread the word!",
    "Express yourself!",
    "Get it off your chest!",
    "Go Forth!",
    "Share something...",
    "Say something...",
    "The world is waiting...",
  ];
  let randomize = placeholders[Math.floor(Math.random() * placeholders.length - 1)];
  let selectedPlaceholder = document.createElement("p");
  selectedPlaceholder = randomize;
  tweetInput.placeholder = selectedPlaceholder;
  console.log(randomize);
}

randomPlaceholders();

function postBox() {
  let post = tweetInput.value.trim();
  let lengths = 250 - post.length;
  charCount.innerText = lengths;

  if (lengths < 250 && lengths >= 0) {
    tweetButton.disabled = false;
  } else {
    tweetButton.disabled = true;
  }

  if (lengths < 125) {
    charCount.style.color = "yellow";
  } else if (lengths < 50) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "skyblue";
  }
}

postBox();

tweetInput.addEventListener("input", postBox);

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

async function getAllUsers(params) {
  const loginData = getLoginData();
  try {
    let promise = fetch("http://localhost:5005/api/users", {
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

getAllUsers();

getAllPost();

// async function getAPost(posts) {
//   const loginData = getLoginData();
//   try {
//     let promise = fetch(`http://localhost:5005/api/posts/${posts._id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${loginData.token}`,
//       },
//     });
//     let response = await promise;
//     let data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error;
//   }
// }

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
    // let card = document.createElement("div");
    // card.className = "card my-3 w-100";

    // let cardHeader = document.createElement("div");
    // cardHeader.className = "";
    // card.appendChild(cardHeader);

    // let cardHeaderProfileName = document.createElement("a");
    // // cardHeaderProfileName.href = `postDetail.html?id=${post._id}`;
    // // cardHeaderProfileName.href = `userProfile.html?_id=${post.username}`;
    // cardHeaderProfileName.href = `postDetail.html?_id=${post._id}`;
    // cardHeaderProfileName.innerText = post.username || "Unknown User";
    // cardHeader.appendChild(cardHeaderProfileName);

    // let imagePost = document.createElement("img");
    // imagePost.src = post.imagePost || "";
    // card.appendChild(imagePost);

    // let cardBody = document.createElement("div");
    // let cardText = document.createElement("p");
    // cardText.innerText = post.text;
    // cardText.className = "px-3";
    // cardBody.appendChild(cardText);
    // card.appendChild(cardBody);

    // let likeButton = document.createElement("button");
    // likeButton.innerText = "Like";
    // likeButton.addEventListener("click", async (post) => {
    //   let promise = fetch("http://localhost:5005/api/likes" + post._id);
    // });

    // // if(){

    // // }

    // let cardFooter = document.createElement("div");
    // cardFooter.className = "";
    // let cardFooterText = document.createElement("p");
    // cardFooterText.innerText = new Date(post.createdAt).toLocaleString();
    // cardBody.appendChild(likeButton);
    // cardFooter.appendChild(cardFooterText);
    // card.appendChild(cardFooter);

    // postCardArea.appendChild(card);

    let feed = document.createElement("div");
    feed.className = "feed";

    let feedHeader = document.createElement("div");
    feedHeader.className = "feed__header";

    let postStructure = document.createElement("div");
    postStructure.className = "post card";

    let postAvatar = document.createElement("div");
    postAvatar.className = "post__avatar";
    let postImageProfile = document.createElement("img");
    postImageProfile.src = `${post.imageProfile}` ? `${post.imageProfile}` : "";
    postAvatar.appendChild(postImageProfile);

    let userNameLink = document.createElement("a");
    userNameLink.href = `userProfile.html?username=${post.username}`;
    userNameLink.className = "post__username";
    userNameLink.innerText = post.username ? post.username : "Unknown User/Variant";

    let postBody = document.createElement("div");
    postBody.className = "post__body";
    let postHeader = document.createElement("div");
    postHeader.className = "post__header";

    let postHeaderText = document.createElement("div");
    postHeaderText.className = "post__headerText";

    let text = document.createElement("a");
    text.innerText = `${post.text}`;
    text.style.color = "black"
    text.style.textDecoration = "none"
    text.href = `postDetail.html?_id=${post._id}`

    let headerSpecial = document.createElement("span");
    headerSpecial.className = "post__headerSpecial";

    // let materialIcon = document.createElement("span")

    let headerDescription = document.createElement("div");
    headerDescription.className = "post__headerDescription";

    let editPost = document.createElement("button")
    editPost.addEventListener("click", ()=>{
      location.href = `editPost.html?_id=${post._id}`
    })

    // if (post?.username === user?.username) {
    let deleteButton = document.createElement("button");
    deleteButton.innerText = `Delete`;
    deleteButton.className = "btn btn-primary rounded-5"

    deleteButton.addEventListener("click", async () => {
      if (post._id) {
        const loginData = getLoginData();
        try {
          let promise = fetch(`http://localhost:5005/api/posts/${post._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginData.token}`,
            },
          });

          if (response.ok) {
            console.log("Success");
            location.reload();
          }

          let response = await promise;
          let data = await response.json();
          console.log(data);
        } catch (error) {
          console.error;
        }
      }
    });
    // }

    feed.appendChild(feedHeader);

    feed.appendChild(postStructure);
    postHeaderText.appendChild(text);
    postHeader.appendChild(postHeaderText);
    postHeader.appendChild(headerSpecial);
    postBody.appendChild(postHeader);
    postBody.appendChild(headerDescription);
    postBody.appendChild(deleteButton);
    postStructure.appendChild(postAvatar);
    postStructure.appendChild(userNameLink);
    postStructure.appendChild(postBody);

    postCardArea.appendChild(postStructure);
  });
}

// async function filterPost(post) {
//   let searchValue = placehold.value;
//   try {
//     let promise = fetch("http://localhost:5005/api/posts" + post._id);
//     let response = await promise;
//     let data = await response.json();
//     console.log(data);
//     let filteringPost = data.filter((post) => post);
//   } catch (error) {
//     console.error;
//   }
// }
