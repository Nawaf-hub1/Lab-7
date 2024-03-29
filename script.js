let xhrButton = document.getElementById("searchbtn");
let input = document.getElementsByTagName("input")[0];
let searchResults = document.getElementById("searchResults");
let searchFetchPromiseButton = document.getElementById("searchFetchPromise");
let searchFetchAsyncAwaitButton = document.getElementById("searchFetchAsyncAwait");

const apiKey = "JGusQFlLKuAYGIEHkiHjdrPH7ni2QNnZ";

xhrButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingXHR(q);
});

searchFetchPromiseButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingFetch(q);
});

searchFetchAsyncAwaitButton.addEventListener("click", function () {
  let q = input.value;
  getImagesUsingFetchAsyncAwait(q);
});

function getImagesUsingXHR(q) {
  let images = [];
  // send an HTTP GET using XHR(the old way of fetching data. the new way is fetch.)
  let xhr = new XMLHttpRequest();
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
  // this will fire after the xhr.open() and xhr.send() are done
  // ready state = 4... 4 means completed and 200 means OK
  xhr.onreadystatechange = function () {
    // traversing and parsing and utilizing response json objects will be part of the finals
    if (xhr.readyState === 4 && xhr.status === 200) {
      let jsonText = xhr.responseText;
      let resObj = JSON.parse(jsonText);
      // push every url in every resObj into the images array
      for (let item of resObj.data) {
        images.push(item.images.downsized_medium.url);
      }
      generateImgElements(images);
    }
  };
  // ? what is a race condition and what does it have to do with arrays ?????
  // the default is true and it makes this function async
  xhr.open("GET", url, true);
  xhr.send();
}

// fetch with promises
function getImagesUsingFetch(term) {
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + term;
  let images = [];
  fetch(url)
    .then((response) => {
      // response.json() returns the JSON response Objected already parsed and ready to be utilized... i think :3
      return response.json();
    })
    .then((respObj) => {
      // push every url in every resObj into the images array
      for (let item of respObj.data) {
        images.push(item.images.downsized_medium.url);
      }
      generateImgElements(images);
    })
    .catch((e) => {
      console.log("error: " + e);
    });
}

async function getImagesUsingFetchAsyncAwait(q) {
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q;
  let images = [];
  let response = await fetch(url);
  let responseObj = await response.json();
  for (let item of responseObj.data) {
    images.push(item.images.downsized_medium.url);
  }
  generateImgElements(images);

}
function generateImgElements(imagesURLs) {
  for (let imageURL of imagesURLs) {
    let imgElement = document.createElement("img");
    imgElement.src = imageURL;
    searchResults.appendChild(imgElement);
  }
}
