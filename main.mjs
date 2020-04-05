import { getTrendingNews } from "./logic/newsAPI.mjs";
import { getTopCountryData, getWorldData } from "./logic/covid-api-calls.mjs";
import NewsElement from "./components/NewsElement.mjs";
import SearchHistory from "./components/SearchHistory.mjs";
import CountrySearchElement from "./components/CountrySearchInput.mjs";
import TopCountryListElement from "./components/TopCountryList.mjs";

// Start the app logic
$(init);

function init() {
  // Renders top country and world data UI
  renderData();

  setInterval(renderData, 600000);

  // Render trending news
  // renderTrendingNewsList();

  // Build the country search input
  CountrySearchElement();

  // Build Search History
  SearchHistory();
}

function renderData() {
  renderWorldData();
  renderTopCountryList();
}

function renderWorldData() {
  getWorldData()
    .then(function (totals) {
      $("#totalCasesWorld")
        .text(totals.confirmed)
        .append(
          $("<span>")
            .addClass("stat-span-small text-red uk-margin-small-left")
            .text(totals.newConfirmed === "" ? "" : "+" + totals.newConfirmed)
        );
      $("#totalRecoveredWorld").text(totals.recovered);
      $("#totalDeathsWorld")
        .text(totals.deaths)
        .append(
          $("<span>")
            .addClass("stat-span-small text-red uk-margin-small-left")
            .text(totals.newDeaths === "" ? "" : "+" + totals.newDeaths)
        );
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderTopCountryList() {
  getTopCountryData(10).then((data) => {
    TopCountryListElement(data);
  });
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
