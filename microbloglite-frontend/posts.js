/* Posts Page JavaScript */

"use strict";

let postCardArea = document.getElementById("postCardArea");
let tweetInput = document.getElementById("tweetInput");
let tweetButton = document.getElementById("tweetButton");
let charCount = document.getElementById("charCount");
let theUsername = document.getElementById("theUsername");

//

let profileTitle = document.getElementById("profileTitle");
// let profileName = localStorage.getItem("username");
let loginData = getLoginData();
if (loginData) {
  profileTitle.innerText = `${loginData.username}`;
} else {
  profileTitle.innerText = "Guest";
}

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
  let randomize = placeholders[Math.floor(Math.random() * placeholders.length)];
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
    // location.reload(true)
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
    postStructure.className = "post card my-3 border";

    let usernameAndPic = document.createElement("div");
    usernameAndPic.className = "d-flex align-items-center";

    let postAvatar = document.createElement("div");
    postAvatar.className = "post__avatar";

    let postImageProfile = document.createElement("img");
    postImageProfile.src = post.imageProfile ? post.imageProfile : "images/l60Hf.png";
    postAvatar.appendChild(postImageProfile);

    let userNameLink = document.createElement("a");
    userNameLink.href = `userProfile.html?username=${post.username}`;
    userNameLink.className = "post__username";
    userNameLink.innerText = post.username ? post.username : "Unknown User/Variant";

    let timeOfCreation = document.createElement("span");
    timeOfCreation.className = "ps-3";
    timeOfCreation.innerText = new Date(post.createdAt).toLocaleString();

    usernameAndPic.appendChild(postAvatar);
    usernameAndPic.appendChild(userNameLink);
    usernameAndPic.appendChild(timeOfCreation);

    let postBody = document.createElement("div");
    postBody.className = "post__body";
    let postHeader = document.createElement("div");
    postHeader.className = "post__header";

    let postHeaderText = document.createElement("div");
    postHeaderText.className = "post__headerText";

    let text = document.createElement("a");
    text.innerText = `${post.text}`;
    text.style.color = "black";
    text.style.textDecoration = "none";
    text.href = `postDetail.html?_id=${post._id}`;

    let headerSpecial = document.createElement("span");
    headerSpecial.className = "post__headerSpecial";

    let options = document.createElement("div");
    options.className = "container mt-3 d-flex justify-content-around";

    let likeButton = document.createElement("button");
    likeButton.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';
    likeButton.className = "icons ms-3 btn";
    likeButton.addEventListener("click", async () => {
      const loginData = getLoginData();
      let like = {
        postId: `${post._id}`,
      };
      try {
        let promise = fetch(`http://localhost:5005/api/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
          body: JSON.stringify(like),
        });
        let response = await promise;
        let data = await response.json();
        console.log(data);
        location.reload(true)
      } catch (error) {
        console.error;
      }
      // let promise = fetch("http://localhost:5005/api/likes" + post._id);
    });

    let likeCounter = document.createElement("span");
    likeCounter.innerText = post.likes.length;
    likeCounter.className = "ps-2";

    likeButton.appendChild(likeCounter);

    let comment = document.createElement("button");
    comment.innerHTML = `<i class="bi bi-chat"></i>`;
    comment.className = "btn";

    let commentCounter = document.createElement("span");
    commentCounter.innerText = "0";
    commentCounter.className = "ps-2";

    comment.appendChild(commentCounter);

    let retweet = document.createElement("button");
    retweet.innerHTML = `<i class="bi bi-arrow-repeat"></i>`;
    retweet.className = "btn";

    let retweetCounter = document.createElement("span");
    retweetCounter.innerText = "0";
    retweetCounter.className = "ps-2";

    retweet.appendChild(retweetCounter);

    let upload = document.createElement("button");
    upload.innerHTML = `<i class="bi bi-upload"></i>`;
    upload.className = "btn";

    let horizzontal = document.createElement("hr");

    options.appendChild(likeButton);
    options.appendChild(comment);
    options.appendChild(retweet);
    options.appendChild(upload);

    let headerDescription = document.createElement("div");
    headerDescription.className = "post__headerDescription";

    let editPost = document.createElement("button");
    editPost.innerText = "Edit";
    editPost.className = "btn btn-dark me-2 rounded-5";
    editPost.addEventListener("click", () => {
      location.href = `editPost.html?_id=${post._id}`;
    });

    // if (post?.username === user?.username) {
    let deleteButton = document.createElement("button");
    deleteButton.innerText = `Delete`;
    deleteButton.className = "btn btn-dark rounded-5";

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
    postBody.appendChild(editPost);
    postBody.appendChild(deleteButton);
    // postStructure.appendChild(postAvatar);
    // postStructure.appendChild(userNameLink);
    postStructure.appendChild(usernameAndPic);
    postStructure.appendChild(postBody);
    postStructure.appendChild(options);
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
