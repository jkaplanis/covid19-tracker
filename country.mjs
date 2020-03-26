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
  let countryCode = urlParams.get("countryCode");

  getRegionNews(countryCode, 5)
    .then(function(data) {
      $("world-news").append(NewsElement(data));
    })
    .catch(function(err) {
      console.log(err);
    });

  renderSpecificCountryData(countryCode);
}

function renderSpecificCountryData(countryCode) {
  var countryObj = countrySearchByCode(countryCode);
  var countryName = countryObj.country;

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
