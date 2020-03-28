export default function buildSearchHistory() {
  let pastSearches = JSON.parse(localStorage.getItem("covid-app"));
  if (!pastSearches) {
    pastSearches = [];
  }

  pastSearches.forEach(function(countryObj) {
    var linkEl = $("<a>");
    linkEl.attr("href", `./country.html?country=${countryObj.country}`);
    if (countryObj.country === "US") {
      linkEl.text("United States");
    } else {
      linkEl.text(countryObj.country);
    }

    $("#menuDropdown").append($("<li>").append(linkEl));
  });
}
