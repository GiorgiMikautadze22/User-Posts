/*
 https://jsonplaceholder.typicode.com/users
 fetch მეთოდით API დან მოგაქვთ ინფორმაცია და გამოგაქვთ ეკრანზე username 

  მეორე API დან მოგაქვთ პოსტები
  https://jsonplaceholder.typicode.com/posts
  რომელსაც მოყვება userId ველი

  თავიდან გამოგაქვთ ყველა პოსტი, როცა კონკრეტულ იუზერს
  დააჭერთ უნდა გამოიტანოს მხოლოდ მისი პოსტები (userId)

  არჩეული იუზერი უნდა გახდეს აქტიური (bold ან სხვა ფერი)

  იუზერებში უნდა იყოს ღილაკი (ყველა) რომელზე დაჭერისასაც 
  ისევ ყველა პოსტი უნდა გამოჩნდეს
*/

let userDiv = document.getElementById("users");
let postDiv = document.getElementById("posts");
let allBtn = document.getElementById("all");

let userPromise = new Promise((res, rej) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => res(data));
});

let postsPromise = new Promise((res, rej) => {
  fetch(" https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => res(data));
});

userPromise.then((res) => {
  res.forEach((user) => {
    let userName = document.createElement("h2");
    userName.innerHTML = user.name;

    userDiv.append(userName);

    userName.addEventListener("click", () => {
      postDiv.innerHTML = "";
      postsPromise.then((res) => {
        res.forEach((post) => {
          if (user.id === post.userId) {
            let eachPost = document.createElement("div");
            let userPosts = document.createElement("li");
            eachPost.className = "eachPost";
            userPosts.innerHTML = post.title;
            eachPost.append(userPosts);
            postDiv.append(eachPost);
          }
        });
      });
    });
  });
});

function renderPosts() {
  postsPromise.then((res) => {
    res.forEach((post) => {
      let eachPost = document.createElement("div");
      let userPosts = document.createElement("li");

      eachPost.className = "eachPost";
      userPosts.innerHTML = post.title;

      eachPost.append(userPosts);
      postDiv.append(eachPost);
    });
  });
}
renderPosts();

allBtn.addEventListener("click", () => {
  postDiv.innerHTML = "";
  renderPosts();
});
