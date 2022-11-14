//You can edit ALL of the code here
const allShows = getAllShows();
let cardElem = document.getElementById('card');
const allEpisodes = getAllEpisodes();

 
function setup() {

makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  let content = "";
  const rootElem = document.getElementById("root");
  for (let i = 0; i < episodeList.length; i++) {
    let element = episodeList[i];
    content += `
    <div class="card">
    <h5>S0${element.season}E0${element.number}</h5>
      <img src=${element.image.medium} alt="Avatar" style="width:100%">
        <div class="container line-clamp">
        
          <h4>${element.name}</h4>
          ${element.summary}
        </div>
    </div>`;
  }
  rootElem.innerHTML = content;
}




window.onload = setup;

