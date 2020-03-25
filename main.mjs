import { getTrendingNews, getRegionNews } from "./logic/newsAPI.mjs";
import {
  getTopCountryData,
  getSpecificCountryData
} from "./logic/covid-api-calls.mjs";

// Start the app logic
$(init());

function init() {
  // THIS CALL IS USED FOR GETTING A CERTAIN NUMBER OF TRENDING NEWS ARTICLES
  // RELATED TO COVID-19
  // getTrendingNews(5)
  //   .then(articles => console.log(articles))
  //   .catch(err => console.log(err))

  renderTopCountryList();
}

function renderTopCountryList() {
  getTopCountryData(10)
    .then(function(countries) {
      $("#countryListData").empty();
      // dynamically generate list items on main page
      countries.forEach(function(country) {
        // TODO: link to country page and somehow pass country name
        // might neeed to be changed to button element w/ data-country attribute
        var btnLink = $("<a>");
        btnLink.attr("href", "#");
        btnLink.attr(
          "class",
          "uk-button uk-width-1-1 uk-column-1-2 stat-number-small"
        );

        var countryName = $("<p>");
        countryName.attr("class", "uk-margin-remove uk-text-right");
        countryName.text(country.Country);

        var totalCases = $("<p>");
        totalCases.attr("class", "uk-margin-remove uk-text-left");
        totalCases.text(parseInt(country.TotalConfirmed).toLocaleString());

        btnLink.append(countryName, totalCases);

        $("#countryListData").append(btnLink);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
