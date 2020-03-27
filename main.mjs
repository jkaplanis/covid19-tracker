import { getTrendingNews, getRegionNews } from "./logic/newsAPI.mjs";
import {
  getTopCountryData,
  getSpecificCountryData,
  getWorldData
} from "./logic/covid-api-calls.mjs";
import {
  countrySearchByCode,
  countrySearchByName,
  countries
} from "./data/countries.mjs";
import NewsElement from "./components/NewsElement.mjs";

// Start the app logic
$(init);

function init() {
  renderWorldData();
  renderTopCountryList();
  renderTrendingNewsList();

  // Country search input specific event listener setup
  countryInputEventListenerInitialization();
  setUpEventListeners();
}

function renderWorldData() {
  getWorldData()
    .then(function(totals) {
      $("#totalCasesWorld").text(totals.confirmed.toLocaleString());
      $("#totalRecoveredWorld").text(totals.recovered.toLocaleString());
      $("#totalDeathsWorld").text(totals.deaths.toLocaleString());
    })
    .catch(function(error) {
      console.log(error);
    });
}

function renderTopCountryList() {
  getTopCountryData(10)
    .then(function(countries) {
      $("#countryListData").empty();
      // dynamically generate list items on main page
      countries.forEach(function(country) {
        var btnLink = $("<a>");
        btnLink.attr("href", `/country.html?country=${country.Country}`);
        btnLink.attr(
          "class",
          "uk-button uk-width-1-1 uk-column-1-2 stat-number-small uk-padding-remove uk-margin-small"
        );

        var countryName = $("<p>");
        countryName.attr("class", "uk-margin-remove uk-text-right");
        countryName.text(country.Country);

        var totalCases = $("<p>");
        totalCases.attr(
          "class",
          "uk-margin-remove uk-text-left text-red uk-text-bold"
        );
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
    .then(function(data) {
      $("world-news").append(NewsElement(data));
    })

    .catch(function(error) {
      console.log(error);
    });
}

function setUpEventListeners() {
  // Global event listeners go here
}

function countryInputEventListenerInitialization() {
  let searchFormEl = $("#searchForm");
  let searchFormInputEl = $("#searchForm input");
  let searchFormDropdown = $("#searchFormDropdown");

  // Country search on key up listener
  searchFormInputEl.on("keyup", countrySearchInputHandler);

  // Country search dropdown on blur listener
  searchFormInputEl.on("blur", hideCountryListHandler);

  // Country search on focus listener
  searchFormInputEl.on("focus", showCountryListHandler);

  // Country search input submit listener
  searchFormDropdown.on("mousedown", function(event) {
    event.preventDefault();
  });

  searchFormEl.on("submit", navigateToCountryPageOnSubmit);
}

function countrySearchInputHandler(event) {
  let input = event.target;
  let inputValue = input.value;
  let results = [];
  if (inputValue) {
    countries.forEach(function(obj) {
      inputValue.replace(/\\/g, "");
      let regexp = new RegExp(`${inputValue}`, "gi");
      if (regexp.test(obj.country)) {
        results.push(obj);
      }
    });
    buildCountrySearchDropdown(results);
  }
}

function buildCountrySearchDropdown(countryArray) {
  $("#searchFormDropdown").empty();
  let countryUlEl = $("<ul>");

  if (countryArray.length > 0) {
    let elements = countryArray.map(function(obj) {
      let countryLiEl = $("<li>");
      let linkEl = $("<a>");
      linkEl.attr("href", `/country.html?country=${obj.country}`);
      linkEl.attr("data-country-name", obj.country);
      linkEl.text(obj.country);
      countryLiEl.append(linkEl);
      linkEl.on("mousedown", navigateToCountryPage);

      return $(countryLiEl);
    });

    if (elements.length > 0) {
      $(countryUlEl).append(elements);
      $("#searchFormDropdown").append(countryUlEl);
    }
  } else {
    $(countryUlEl)
      .append("<li>")
      .text("No Results");
    $("#searchFormDropdown").append(countryUlEl);
  }
}

function hideCountryListHandler(event) {
  $("#searchFormDropdown").css("display", "none");
}

function showCountryListHandler() {
  $("#searchFormDropdown").css("display", "block");
}

function navigateToCountryPage(event) {
  let countryName = $(event.target).attr("data-country-name");
  let countryObj = countrySearchByName(countryName);

  if (countryObj) {
    addSearchToLocalStorage(countryObj);
  }
}

function navigateToCountryPageOnSubmit(event) {
  let inputValue = $(".uk-input").val();

  let returnedCountryData = countrySearchByName(inputValue);

  if (returnedCountryData) {
    addSearchToLocalStorage(returnedCountryData);
    window.location.href = `country.html?country=${returnedCountryData.country}`;
  }
}

function addSearchToLocalStorage(countryObj) {
  let pastSearches = localStorage.getItem("covid-app");
  if (pastSearches) {
    pastSearches = JSON.parse(pastSearches);
  } else {
    pastSearches = [];
  }

  let alreadyContainsCountry = pastSearches.filter(obj => {
    return obj.country.toLowerCase() === countryObj.country.toLowerCase();
  });

  if (alreadyContainsCountry.length === 0) {
    pastSearches.push(countryObj);
    localStorage.setItem("covid-app", JSON.stringify(pastSearches));
  }
}
