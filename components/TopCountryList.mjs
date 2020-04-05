import { countrySearchByName } from "../data/countries.mjs";

export default function buildTopCountryList(countries) {
  let table = $("#countryDataTable");
  let countryRows = $("#countryRows").empty();

  table.css("border-collapse", "seperate");
  table.css("border-spacing", "0 10px");

  table.css("margin", "auto");

  countries.forEach(function (country) {
    let rowEl = $("<tr>");

    rowEl.append($("<td>")).css("text-align", "right").text(country.cases);

    let nameCell = $("<td>")
      .css("text-align", "center")
      .css("padding", "0px 30px");

    let countryLinkEl = $("<a>")
      .attr("href", `./country.html?country=${country.country_name}`)
      .addClass("text-white")
      .text(countrySearchByName(country.country_name).display);

    nameCell.append(countryLinkEl);
    rowEl.append(nameCell);

    rowEl.append(
      $("<td>")
        .text(country.deaths)
        .css("text-align", "left")
        .addClass("text-red")
    );
    countryRows.append(rowEl);
  });
}
