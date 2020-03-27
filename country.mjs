import { getRegionNews } from "./logic/newsAPI.mjs";
import { getSpecificCountryData } from "./logic/covid-api-calls.mjs";
import {
  countrySearchByCode,
  countrySearchByName,
  countries
} from "./data/countries.mjs";
import NewsElement from "./components/NewsElement.mjs";

$(init);

function init() {
  var urlParams = new URLSearchParams(window.location.search);
  let countryName = urlParams.get("country");
  let countryObj = countrySearchByName(countryName);
  buildNewsArticles(countryObj);

  renderSpecificCountryData(countryName);
}

function renderSpecificCountryData(countryName) {
  getSpecificCountryData(countryName).then(function(countryDataObj) {
    $("#totalCasesCountry").text(
      countryDataObj.TotalConfirmed.toLocaleString()
    );
    $("#newCasesCountry").text(
      "+" + countryDataObj.NewConfirmed.toLocaleString()
    );
    $("#totalDeathsCountry").text(countryDataObj.TotalDeaths.toLocaleString());
    $("#newDeathsCountry").text(
      "+" + countryDataObj.NewDeaths.toLocaleString()
    );
    $("#totalRecoveredCountry").text(
      countryDataObj.TotalRecovered.toLocaleString()
    );
    $("#newRecoveredCountry").text(
      "+" + countryDataObj.NewRecovered.toLocaleString()
    );
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
