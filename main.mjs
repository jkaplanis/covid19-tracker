import { getTrendingNews } from "./logic/newsAPI.mjs";
import { getTopCountryData, getWorldData } from "./logic/covid-api-calls.mjs";
import {
  countrySearchByDisplay,
  countrySearchByName,
  countries
} from "./data/countries.mjs";
import NewsElement from "./components/NewsElement.mjs";
import SearchHistory from "./components/SearchHistory.mjs";
import CountrySearchElement from "./components/CountrySearchInput.mjs";

// Start the app logic
$(init);

function init() {
  renderWorldData();
  renderTopCountryList();
  renderTrendingNewsList();

  // Build the country search input
  CountrySearchElement();

  SearchHistory();
}

function renderWorldData() {
  getWorldData()
    .then(function(totals) {
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
    .catch(function(error) {
      console.log(error);
    });
}

function renderTopCountryList() {
  getTopCountryData(10).then(function(countries) {
    let table = $("#countryDataTable");
    let tableBody = $("#countryDataTable tbody");

    table.css("border-collapse", "seperate");
    table.css("border-spacing", "0 10px");

    table.css("margin", "auto");

    countries.forEach(function(country) {
      let rowEl = $("<tr>");

      rowEl
        .append($("<td>"))
        .css("text-align", "right")
        .text(country.cases);

      let nameCell = $("<td>")
        .css("text-align", "center")
        .css("padding", "0px 30px");

      let countryLinkEl = $("<a>")
        .attr("href", `./country.html?country=${country.country_name}`)
        .addClass("text-white")
        .text(countrySearchByName(country.country_name).display);

      nameCell.append(countryLinkEl);
      rowEl.append(nameCell);

      rowEl.append(
        $("<td>")
          .text(country.deaths)
          .css("text-align", "left")
          .addClass("text-red")
      );
      tableBody.append(rowEl);
    });
  });
}

function renderTrendingNewsList() {
  getTrendingNews(5)
    .then(function(data) {
      $("world-news").append(NewsElement(data));
    })

    .catch(function(error) {
      console.log(error);
    });
}
