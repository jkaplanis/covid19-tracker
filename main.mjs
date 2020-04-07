import { getTrendingNews } from "./logic/newsAPI.mjs";
import { getTopCountryData, getWorldData } from "./logic/covid-api-calls.mjs";
import NewsElement from "./components/NewsElement.mjs";
import renderSearchHistory from "./components/SearchHistory.mjs";
import renderCountrySearchElement from "./components/CountrySearchInput.mjs";
import TopCountryListElement from "./components/TopCountryList.mjs";
import WorldDataElement from "./components/WorldData.mjs";
import Graph from "./components/Graph.mjs";

// Start the app logic
$(init);

// FUTURE IMPLEMENTATION OF GRAPH
// Global section width used for D3.js
// let sectionWidth = $("#bar-chart-container").width();

let lastUpdated = 0;

// FUTURE IMPLEMENTATION OF GRAPH
// On window resize rebuild the D3.js chart
// $(window).resize(function () {
//   sectionWidth = $("#bar-chart-container").width();
//   renderGraph(sectionWidth);
// });

function init() {
  // Render trending news articles
  renderTrendingNewsList();

  // FUTURE IMPLEMENTATION OF GRAPH
  // renderGraph(sectionWidth);

  // Renders top country and world data UI
  renderData();

  // Render the search history in the menu
  renderSearchHistory();

  // Render the search element
  renderCountrySearchElement();

  setInterval(() => updateTimeSinceUpdate(), 1000);

  // Every 10 mins re-fetch and build top country and world data
  setInterval(renderData, 600000);
}

function renderData() {
  lastUpdated = Date.now();
  updateTimeSinceUpdate();
  renderWorldData();
  renderTopCountryList();
}

function updateTimeSinceUpdate() {
  let since = moment(lastUpdated).fromNow();
  $("#updatedLast").text(since);
}

function renderWorldData() {
  getWorldData()
    .then((totals) => WorldDataElement(totals))
    .catch((err) => console.log("Error getting world data. ", err));
}

function renderTopCountryList() {
  getTopCountryData(10)
    .then((data) => TopCountryListElement(data))
    .catch((err) => console.log("Error fetching top country data", err));
}

function renderTrendingNewsList() {
  getTrendingNews(5)
    .then(function (data) {
      $("world-news").append(NewsElement(data));
    })

    .catch(function (error) {
      console.log(error);
    });
}

function renderGraph(sectionWidth) {
  getTopCountryData(10).then((dataArray) => {
    $(".bar-chart").html(Graph(sectionWidth, dataArray, 0));
  });
}
