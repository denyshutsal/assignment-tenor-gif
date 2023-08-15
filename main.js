"use strict";

let submitBtn = document.querySelector("#submitBtn");
let result = document.querySelector(".result");

submitBtn.addEventListener("click", function () {
  // get value from user input
  let category = document.querySelector("#request").value;

  // generate the GET path
  let theUrl = `https://tenor.googleapis.com/v2/search?q=${category}&key=AIzaSyBGUHHiyot0-s8h8GF3TSjziKRVvaztpaM&client_key=Test&limit=8`;

  httpGetAsync(theUrl);
});

function httpGetAsync(theUrl) {
  let http = new XMLHttpRequest();

  http.open("GET", theUrl);

  http.send();

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      render(http.responseText);
    }
  };
}

// render given items
function render(responsetext) {
  // clear before put a new items
  result.innerHTML = "";

  let responseObjects = JSON.parse(responsetext);
  let gifsArray = responseObjects.results;

  for (let i = 0; i < gifsArray.length; i++) {
    let item = gifsArray[i];

    result.innerHTML += `<img src="${item.media_formats.tinygif.url}" alt="${item.content_description}">`;
  }

  return;
}
