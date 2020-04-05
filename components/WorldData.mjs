export default function buildWorldDataElement(totals) {
  $("#totalCasesWorld")
    .text(totals.confirmed)
    .append(
      $("<span>")
        .addClass("stat-span-small text-red uk-margin-small-left")
        .text(totals.newConfirmed === "" ? "" : "+" + totals.newConfirmed)
    );
  $("#totalRecoveredWorld").text(totals.recovered);
  $("#totalDeathsWorld")
    .text(totals.deaths)
    .append(
      $("<span>")
        .addClass("stat-span-small text-red uk-margin-small-left")
        .text(totals.newDeaths === "" ? "" : "+" + totals.newDeaths)
    );
}
