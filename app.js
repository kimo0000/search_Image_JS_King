const accesKey = `zFxevWurtNx5-LrXL548yoRrpp8pLJgVLxiJH85DWM8`;

const form = document.querySelector("form");
const inputSearch = document.querySelector("form input");
const parentEle = document.querySelector(".search_results");
const shwoBtn = document.querySelector("#show_more");

let page = 1;

async function searchImages(value) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${value}&client_id=${accesKey}`;
  const response = await fetch(url);
  // console.log(response)
  const data = await response.json();
  const results = data.results;
  console.log(results);

  page++;

  if (page === 1) {
    parentEle.innerHTML = "";
  } else {
    console.log(page);
    results.map((result) => {
      console.log(result);
      let parent = document.createElement("div");
      parent.className = "box";
      let image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      let link = document.createElement("a");
      link.textContent = result.alt_description;
      link.href = result.links.html;
      link.target = "_blank";

      parent.append(image, link);
      console.log(parent);

      parentEle.appendChild(parent);
    });
  }

  if (page > 1) {
    shwoBtn.style.display = "block";
  }

  console.log(results.length);
  if (results.length === 0) {
    shwoBtn.style.pointerEvents = "none";
    shwoBtn.style.opacity = "0.4";
  }
}

let value;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let value = inputSearch.value;
  searchImages(value);
  inputSearch.value = "";
});

shwoBtn.addEventListener("click", (e) => {
  searchImages(value);
});
