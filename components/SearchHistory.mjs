export default function buildSearchHistory() {
  let pastSearches = JSON.parse(localStorage.getItem("covid-app"));
  if (!pastSearches) {
    pastSearches = [];
  }

  pastSearches.forEach(function(countryObj, index) {
    if (index < 5) {
      var linkEl = $("<a>");
      linkEl.attr("href", `./country.html?country=${countryObj.country}`);
      linkEl.text(countryObj.display);

      $("#menuDropdown").append($("<li>").append(linkEl));
    }
  });
}
