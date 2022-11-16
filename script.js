//You can edit ALL of the code here
let episodes;
let allShows = getAllShows();
let result = document.getElementById("results");
const selectShowTag = document.getElementById("selectShow");
const selectEpisodeTag = document.getElementById("selectMenu");
let mode = "shows";

createDropDownMenuForShows(allShows);
displayAllShows(allShows);
result.innerHTML = `Displaying ${allShows.length} / ${allShows.length}`;

// sort shows function alphabetically

function sortByName(array) {
  array.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
}


function fetchEpisodes(showId) {
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      episodes = data;
      createDropDownMenuForEpisodes(data);
    })
    .catch((err) => console.error(err));
}
// filter shows function

function filterShows(event) {
  let value = event.target.value.toLowerCase();
  let foundLists = allShows.filter((show) => {
    let toLowerCaseName = show.name.toLowerCase();
    let toLowerCaseSummary = show.summary.toLowerCase();
    return (
      toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
    );
  });
  displayAllShows(foundLists);
  result = `Displaying ${foundLists.length} / ${allShows.length}`;
}

function filterEpisodes(event) {
  let toLowerCaseSummary;
  let value = event.target.value.toLowerCase();
  let foundLists = episodes.filter((episode) => {
    let toLowerCaseName = episode.name.toLowerCase();
    if (episode.summary && episode.name) {
      toLowerCaseSummary = episode.summary.toLowerCase();
      return (
        toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
      );
    } else if (episode.name) return toLowerCaseName.includes(value);
  });
  displayAllEpisodes(foundLists);
  result.innerHTML = `Displaying ${foundLists.length} / ${episodes.length}`;
}

// a function for drop down menu for shows

function createDropDownMenuForShows(allShows) {
  sortByName(allShows);
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.id;
    selectShowTag.appendChild(option);
  });
  selectAndInputFieldEventListener();
}

function selectAndInputFieldEventListener() {
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", filterShows);
  selectShowTag.addEventListener("change", (event) => {
    searchInput.value = "";
    let showId = event.target.value;
    if (showId) {
      if (mode == "shows") {
        mode = "episodes";
        searchInput.removeEventListener("input", filterShows);
        searchInput.addEventListener("input", filterEpisodes);
      }
      fetchEpisodes(showId);
    } else {
      if (mode == "episodes") {
        mode = "shows";
        searchInput.removeEventListener("input", filterEpisodes);
        searchInput.addEventListener("input", filterShows);
      }
      selectEpisodeTag.innerHTML =
        '<option value="" id="default-option">select an episode</option>';
      displayAllShows(allShows);
      result.innerHTML = `Displaying ${allShows.length} / ${allShows.length}`;
    }
  });
}
// displays all shows

function displayShow(show) {
  selectEpisodeTag.style.display = "none";
  const divContainer = document.createElement("div");
  const titleElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const summaryElement = document.createElement("p");
  const genreRatingStatus = document.createElement("div");
  const genreElement = document.createElement("p");
  const runTimeElement = document.createElement("p");
  const statusElement = document.createElement("p");
  const ratingElement = document.createElement("p");

  // appending elements to the page
  document.getElementById("root").appendChild(divContainer);
  divContainer.appendChild(titleElement);
  divContainer.appendChild(imageElement);
  divContainer.appendChild(summaryElement);
  divContainer.appendChild(genreRatingStatus);
  genreRatingStatus.appendChild(genreElement);
  genreRatingStatus.appendChild(runTimeElement);
  genreRatingStatus.appendChild(statusElement);
  genreRatingStatus.appendChild(ratingElement);

  // give div a class for better accessibility
  titleElement.id = `${show.id}`;
  divContainer.classList = "title-image-summary-container";
  imageElement.classList = "episode-image";
  titleElement.classList = "episode-title";
  summaryElement.classList = "episode-summary";
  genreRatingStatus.classList = "genre-rating-status";


  titleElement.innerHTML = `<a href="#" target="">${show.name}</a>`; //adds anchor element to the title
  
  //fetches all episodes when show name is clicked
  
  titleElement.addEventListener("click", () => {
    fetchEpisodes(show.id);
  });
  if (show.image == null) {
    imageElement.src = "../Image_coming_soon.png";
  } else {
    imageElement.src = `${show.image.medium}`;
    summaryElement.innerHTML = `${show.summary}`;
  }
}

// display all shows

function displayAllShows(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((element) => {
    displayShow(element);
  });
}

//The display function creates elements and set their inner html for episodes

function display(episode) {
  selectEpisodeTag.style.display = "block";
  const divContainer = document.createElement("div");
  const titleForEpisodeElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const summaryElement = document.createElement("p");

  // appending elements to the page

  document.getElementById("root").appendChild(divContainer);
  divContainer.appendChild(titleForEpisodeElement);
  divContainer.appendChild(imageElement);
  divContainer.appendChild(summaryElement);

  

  divContainer.classList = "title-image-summary-container";
  imageElement.classList = "episode-image";
  titleForEpisodeElement.classList = "episode-title";
  summaryElement.classList = "episode-summary";
  divContainer.id = "div";

    // inner text of html elements

  titleForEpisodeElement.innerHTML = `<a href="${episode.url}" target"_blank">${
    episode.name
  } - S${String(episode.season).padStart(2, "0")}E${String(
    episode.number
  ).padStart(2, "0")} </a>`; // wraps the title element inside an anchor tag
  if (episode.image == null) {
    imageElement.src = "../Image_coming_soon.png";
  } else {
    imageElement.src = `${episode.image.medium}`;
    summaryElement.innerHTML = `${episode.summary}`;
  }
}

// fetch casting

function fetchCasting() {
  fetch(`http://api.tvmaze.com/shows/1/band-of-brothers`)
    .then((response) => response.json())
    .then((data) => {
      const castContainer = document.createElement("div");
      document.body.children[0].appendChild(castContainer);
      data._embedded.cast.forEach((item) => {
        console.log(item.person.name);
        let castElement = document.createElement("p");
        castElement.innerHTML = `<a href="#" target=""> ${item.person.name},  </a> `;
        castContainer.appendChild(castElement);
      });
    });
}

function displayAllEpisodes(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((episode) => {
    display(episode);
  });
}

function createDropDownMenuForEpisodes(allEpisodes) {
  selectEpisodeTag.innerHTML =
    '<option value="" id="default-option">select an episode</option>';
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    option.value = episode.name;
    selectEpisodeTag.appendChild(option);
  });
  displayAllEpisodes(episodes);
  result.innerHTML = `Displaying ${allEpisodes.length} / ${allEpisodes.length}`;
  selectEpisodeTag.addEventListener("change", (event) => {
    let searchInput = document.getElementById("search-field");
    document.getElementById("results").innerHTML = "";
    searchInput.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field
    const selected = episodes.filter((episode) => {
      return episode.name === event.target.value;
    });
    displayAllEpisodes(selected);
    result.innerHTML = `Displaying ${selected.length} / ${allEpisodes.length}`;
    // when the select an episode choice is selected tall episodes will be displayed
    if (selectEpisodeTag.value == "") {
      displayAllEpisodes(episodes);
      result.innerHTML = `Displaying ${allEpisodes.length} / ${allEpisodes.length}`;
    }
  });
}


window.onload = setup;

