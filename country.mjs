import { getRegionNews } from "./logic/newsAPI.mjs";
import { getSpecificCountryData } from "./logic/covid-api-calls.mjs";
import {
  countrySearchByCode,
  countrySearchByName,
  countries
} from "./data/countries.mjs";

$(init);

function init() {
  // renderSpecificCountryData();
}

function renderSpecificCountryData() {
  getSpecificCountryData().then(function(countryTotals) {
    var countryCases = countryTotals.TotalConfirmed.toLocaleString();
    var newCases = countryTotals.NewConfirmed;
    var countryDeaths = countryTotals.TotalDeaths;
    var newDeaths = countryTotals.newDeaths;
    var countryRecovered = countryTotals.TotalRecovered;
    var newRecovered = countryTotals.NewRecoverd;
    $("#totalCasesCountry") = countryCases;
  });
}
