import { getTrendingNews, getRegionNews } from "./logic/newsAPI.mjs";
import {
  getTopCountryData,
  getSpecificCountryData
} from "./logic/covid-api-calls.mjs";
import { countries } from "./data/countries.mjs";

// Start the app logic
$(init());

function init() {
  // THIS CALL IS USED FOR GETTING A CERTAIN NUMBER OF TRENDING NEWS ARTICLES
  // RELATED TO COVID-19
  // getTrendingNews(5)
  //   .then(articles => console.log(articles))
  //   .catch(err => console.log(err))

  renderTopCountryList();
  // renderTrendingNewsList();
  setUpEventListeners();
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

function renderTrendingNewsList() {
  getTrendingNews(5)
    .then(function(articles) {
      console.log(articles);
      $("#world-news").empty();

      articles.forEach(function(article, index) {
        var divEl = $("<div>");
        divEl.attr("class", "uk-flex uk-margin-top");

        var ulEl = $("<ul>");
        ulEl.attr("class", "uk-list uk-margin-left uk-margin-remove-bottom");

        var liTitle = $("<li>");
        liTitle.text("Title: " + article.title);

        var liDate = $("<li>");
        liDate.text("Date: " + article.publishedAt);

        var sourceLink = $("<a>");
        sourceLink.attr("href", article.url);
        sourceLink.attr("target", "_blank");
        sourceLink.text(article.source.name);

        var liSource = $("<li>");
        liSource.text("Source: ");
        liSource.append(sourceLink);

        var liDescription = $("<li>");
        liDescription.text("Description: " + article.description);

        ulEl.append(liTitle, liDate, liSource, liDescription);
        divEl.append(ulEl);
        $("#world-news").append(divEl);
        if (index < articles.length - 1) {
          $("#world-news").append($("<hr>").attr("class", "uk-divider-small"));
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function setUpEventListeners() {
  $("#searchForm input").on("keyup", countrySearchInputHandler);
  $("#searchForm input").on("blur", hideCountryListHandler);
  $("#searchForm input").on("focus", showCountryListHandler);
  $("#searchFormDropdown").click(countryClickedHandler);
}

function countrySearchInputHandler(event) {
  let input = event.target;
  let inputValue = input.value;
  let results = [];

  countries.forEach(function(country) {
    inputValue.replace(/\\/g, "");
    let regexp = new RegExp(`${inputValue}`, "gi");
    if (regexp.test(country.country)) {
      results.push(country);
    }

    buildCountrySearchDropdown(results);
  });
}

function buildCountrySearchDropdown(countryArray) {
  $("#searchFormDropdown").empty();
  let countryUlEl = $("<ul>");

  let elements = countryArray.map(function(obj) {
    let countryLiEl = $("<li>");
    $(countryLiEl).attr("data-country-code", obj.code);
    return $(countryLiEl).text(obj.country);
  });

  if (elements.length > 0) {
    $(countryUlEl).append(elements);
    $("#searchFormDropdown").append(countryUlEl);
  } else {
    $(countryUlEl)
      .append("<li>")
      .text("No Results");
    $("#searchFormDropdown").append(countryUlEl);
  }
}

function hideCountryListHandler() {
  $("#searchFormDropdown").css("display", "none");
}

function showCountryListHandler() {
  $("#searchFormDropdown").css("display", "block");
}

// This is not working see issue #55
function countryClickedHandler(event) {
  console.log("clicked");
}
