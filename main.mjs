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
  // renderTrendingNewsList();

  // Use this function to setup any global event listeners
  // setUpEventListeners();

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
        // TODO: link to country page and somehow pass country name
        // might neeed to be changed to button element w/ data-country attribute
        var countryObj = countrySearchByName(country.Country);
        var btnLink = $("<a>");
        btnLink.attr("href", `/country.html?countryCode=${countryObj.code}`);
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

  // ALL THE COUNTRY INPUT EVENT LISTENERS SHOULD BE IN THEIR OWN FUNCTION - FUTURE FIX
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
    let linkEl = $("<a>");
    linkEl.attr("href", `/country.html?countryCode=${obj.code}`);
    linkEl.attr("data-country-code", obj.code);
    linkEl.text(obj.country);
    linkEl.on("mousedown", navigateToCountryPage);
    countryLiEl.append(linkEl);

    return $(countryLiEl);
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

function hideCountryListHandler(event) {
  $("#searchFormDropdown").css("display", "none");
}

function showCountryListHandler() {
  $("#searchFormDropdown").css("display", "block");
}

function navigateToCountryPage(event) {
  let countryCode = $(event.target).attr("data-country-code");
  let countryObj = countrySearchByCode(countryCode);

  if (countryObj) {
    addSearchToLocalStorage(countryObj);
  }
}

function navigateToCountryPageOnSubmit(event) {
  let inputValue = $(".uk-input").val();

  let returnedCountryData = countrySearchByName(inputValue);

  if (returnedCountryData) {
    addSearchToLocalStorage(returnedCountryData);
    window.location.href = `country.html?countryCode=${returnedCountryData.code}`;
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
