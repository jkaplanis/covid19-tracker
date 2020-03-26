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
}
