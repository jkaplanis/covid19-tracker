import { getRegionNews } from "./logic/newsAPI.mjs";
import { getSpecificCountryData } from "./logic/covid-api-calls.mjs";
import { countrySearchByName } from "./data/countries.mjs";
import NewsElement from "./components/NewsElement.mjs";
import SearchHistory from "./components/SearchHistory.mjs";

$(init);

function init() {
  var urlParams = new URLSearchParams(window.location.search);
  let countryName = urlParams.get("country");
  let countryObj = countrySearchByName(countryName);
  buildNewsArticles(countryObj);
  renderSpecificCountryName(countryObj.display);
  renderSpecificCountryData(countryObj.country);

  SearchHistory();
}

function renderSpecificCountryName(displayName) {
  $("#specificCountryName").text(displayName);
}

function renderSpecificCountryData(countryName) {
  getSpecificCountryData(countryName).then(function(countryDataObj) {
    // total cases
    $("#totalCasesCountry")
      .text(countryDataObj.total_cases)
      .append(
        $("<span>")
          .addClass("stat-span-small text-red uk-margin-small-left")
          .text(`+${countryDataObj.new_cases}`)
      );

    // active cases
    $("#activeCases").text(countryDataObj.active_cases);

    // cases per 1 million
    $("#casePerOneM").text(countryDataObj.total_cases_per1m);

    // total deaths
    $("#totalDeathsCountry")
      .text(countryDataObj.total_deaths)
      .append(
        $("<span>")
          .addClass("stat-span-small text-red uk-margin-small-left")
          .text(`+${countryDataObj.new_deaths}`)
      );

    // critical condition cases
    $("#criticalCases").text(countryDataObj.serious_critical);

    // recovered cases
    $("#recoveredCases")
      .append("<p>")
      .addClass("text-green")
      .text(countryDataObj.total_recovered);
  });
}

function buildNewsArticles(countryObj) {
  getRegionNews(countryObj.code, 5)
    .then(function(data) {
      if (data.length > 0) {
        $("#world-news").append(NewsElement(data));
      } else {
        $("#worldNewsSection").css("display", "none");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
