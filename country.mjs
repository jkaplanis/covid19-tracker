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
    $("#totalCasesCountry").text(countryDataObj.total_cases);
    $("#newCasesCountry").text("+" + countryDataObj.new_cases);
    $("#totalDeathsCountry").text(countryDataObj.total_deaths);
    $("#newDeathsCountry").text("+" + countryDataObj.new_deaths);
    $("#totalRecoveredCountry").text(countryDataObj.total_recovered);
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
