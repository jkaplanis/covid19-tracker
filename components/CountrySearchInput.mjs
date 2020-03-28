import {
  countrySearchByDisplay,
  countries,
  countrySearchByName
} from "../data/countries.mjs";

export default function buildCountrySearch() {
  let formEl = $("<form>")
    .attr("id", "searchForm")
    .addClass("uk-width-medium");

  let labelEl = $("<label>").addClass("uk-flex uk-flex-middle");

  let searchIconEl = $("<i>").addClass(
    "fas fa-search uk-margin-small-right text-white"
  );

  let inputEl = $("<input>")
    .attr("type", "text")
    .attr("placeholder", "Country")
    .addClass("uk-input");

  let dropdownEl = $("<div>").attr("id", "searchFormDropdown");

  labelEl.append(labelEl, searchIconEl, inputEl, dropdownEl);
  formEl.append(labelEl);
  $("#searchInputWrapper").append(formEl);
  countryInputEventListenerInitialization();
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
      if (regexp.test(obj.display)) {
        results.push(obj);
      }
    });
    buildCountrySearchDropdown(results);
  }
}

function hideCountryListHandler(event) {
  $("#searchFormDropdown").css("display", "none");
}

function showCountryListHandler() {
  $("#searchFormDropdown").css("display", "block");
}

function navigateToCountryPageOnSubmit(event) {
  event.preventDefault();
  let inputValue = $(".uk-input").val();

  let returnedCountryData = countrySearchByDisplay(inputValue);

  if (returnedCountryData) {
    addSearchToLocalStorage(returnedCountryData);
    window.location.href = `./country.html?country=${returnedCountryData.country}`;
  }
}

function buildCountrySearchDropdown(countryArray) {
  $("#searchFormDropdown").empty();
  let countryUlEl = $("<ul>");

  if (countryArray.length > 0) {
    let elements = countryArray.map(function(obj) {
      let countryLiEl = $("<li>");
      let linkEl = $("<a>");
      linkEl.attr("href", `./country.html?country=${obj.country}`);
      linkEl.attr("data-country-name", obj.country);
      linkEl.text(obj.display);
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

function navigateToCountryPage(event) {
  let countryName = $(event.target).attr("data-country-name");
  let countryObj = countrySearchByName(countryName);

  if (countryObj) {
    addSearchToLocalStorage(countryObj);
  }
}

function addSearchToLocalStorage(countryObj) {
  let pastSearches = JSON.parse(localStorage.getItem("covid-app"));
  if (!pastSearches) {
    pastSearches = [];
  }

  var index = pastSearches.findIndex(function(element) {
    return countryObj.country === element.country;
  });

  if (index !== -1) {
    pastSearches.splice(index, 1);
  }
  pastSearches.unshift(countryObj);
  localStorage.setItem("covid-app", JSON.stringify(pastSearches));
}
