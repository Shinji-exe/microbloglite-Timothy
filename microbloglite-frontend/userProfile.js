"use strict";

let profileTitle = document.getElementById("profileTitle");
let postCardArea = document.getElementById("postCardArea");
let theUsername = document.getElementById("theUsername");
let biography = document.getElementById("biography");
let pfp = document.querySelector("#pfp");
let proPic = document.getElementById("proPic");
let theFullName = document.getElementById("theFullName")
const urlParams = new URLSearchParams(location.search);
let username = urlParams.get("username");
// let profileName = localStorage.getItem("username");
let loginData = getLoginData();
if (loginData) {
  profileTitle.innerText = loginData.username;
  // theUsername.innerText = `${loginData.username}`
} else {
  profileTitle.innerText = "Guest";
}

async function getProfile() {
  const loginData = getLoginData();
  try {
    let promise = fetch(`http://localhost:5005/api/users/${username}`, {
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
    theFullName.innerText = `@${data.fullName}` || "Loading"
    biography.innerText = data.bio;
    proPic.src = data.profilePicture || "images/l60Hf.png";
    proPic.className = "proPic";
    // createPostCards(data);
  } catch (error) {
    console.error;
  }
}

getProfile();

async function getAllUserPosts() {
  const loginData = getLoginData();

  try {
    let promise = fetch(`http://localhost:5005/api/posts?username=${username}`, {
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
    console.error(error);
  }
}
getAllUserPosts();

function createPostCards(posts) {
  const postCardArea = document.getElementById("postCardArea");

  posts.forEach(() => {
    let skeletonStructure = document.createElement("div");
    skeletonStructure.className = "post card my-3 border skeleton";

    let skeletonHeader = document.createElement("div");
    skeletonHeader.className = "d-flex align-items-center p-3";
    let skeletonAvatar = document.createElement("div");
    skeletonAvatar.className = "skeleton skeleton-text";
    skeletonAvatar.style.width = "50px";
    skeletonAvatar.style.height = "50px";
    skeletonAvatar.style.borderRadius = "50%";

    let skeletonUsername = document.createElement("div");
    skeletonUsername.className = "skeleton skeleton-text";
    skeletonUsername.style.width = "150px";

    let skeletonTime = document.createElement("div");
    skeletonTime.className = "skeleton skeleton-text";
    skeletonTime.style.width = "100px";

    skeletonHeader.appendChild(skeletonAvatar);
    skeletonHeader.appendChild(skeletonUsername);
    skeletonHeader.appendChild(skeletonTime);

    let skeletonBody = document.createElement("div");
    skeletonBody.className = "p-3";
    let skeletonText = document.createElement("div");
    skeletonText.className = "skeleton skeleton-text";
    skeletonText.style.height = "1rem";

    let skeletonActions = document.createElement("div");
    skeletonActions.className = "d-flex justify-content-around mt-3";
    for (let i = 0; i < 4; i++) {
      let skeletonAction = document.createElement("div");
      skeletonAction.className = "skeleton skeleton-text";
      skeletonAction.style.width = "30px";
      skeletonAction.style.height = "30px";
      skeletonActions.appendChild(skeletonAction);
    }
    skeletonBody.appendChild(skeletonText);
    skeletonStructure.appendChild(skeletonHeader);
    skeletonStructure.appendChild(skeletonBody);
    skeletonStructure.appendChild(skeletonActions);
    postCardArea.appendChild(skeletonStructure);
  });

  setTimeout(() => {
    postCardArea.innerHTML = "";
    posts.forEach((post) => {
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
      postImageProfile.className = "skeleton";
      postImageProfile.src = post.imageProfile ? post.imageProfile : "images/l60Hf.png";
      postAvatar.appendChild(postImageProfile);

      let userNameLink = document.createElement("a");
      userNameLink.href = `userProfile.html?username=${post.username}`;
      userNameLink.className = "post__username";
      userNameLink.innerText = post.username ? post.username : "Unknown User/Variant";

      let timeOfCreation = document.createElement("span");
      timeOfCreation.className = "ps-3";
      timeOfCreation.innerText = new Date(post.createdAt).toLocaleString();

      profileTitle.href = `userProfile.html?username=${post.username}`;

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
      options.className = "container mt-3 d-flex justify-content-around border-top";

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
          location.reload(true);
        } catch (error) {
          console.error;
        }
        // let promise = fetch("http://localhost:5005/api/likes" + post._id);
      });

      let likeCounter = document.createElement("span");
      likeCounter.innerText = post.likes.length;
      likeCounter.className = "ps-2";

      if (post.likes.length > 0) {
        likeButton.style.color = "#1a91da";
      }

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
  }, 2000);
}

async function getOtherUsersAndPosts() {
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
    theUsername.innerText = userProfile.username || "Loading...";
    biography.innerText = userProfile.bio;
    proPic.src = userProfile.profilePicture || "images/l60Hf.png";
    proPic.className = "proPic";
    // createPostCards(data);
  } catch (error) {
    console.error;
  }
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