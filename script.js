//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById('root');




function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const cardElem = document.getElementById('card');
}

window.onload = setup;

