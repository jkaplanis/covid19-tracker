const WORLD_TOTAL_QUERY_URL =
  "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php";
const ALL_COUNTRIES_QUERY_URL =
  "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php";
const COUNTRY_QUERY_URL =
  "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=";
const QUERY_HEADER = {
  "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
  "x-rapidapi-key": "d2059fb63amsh27a7892ac6cfd8fp15d375jsnf602b99abdd0"
};

/**
 * @param {num} numOfCountries number of countries to return
 * @returns {obj}
 * returns n number of top countries affected by COIVD-19
 */
export async function getTopCountryData(numOfCountries) {
  if (numOfCountries) {
    let response = await $.ajax({
      url: ALL_COUNTRIES_QUERY_URL,
      method: "GET",
      headers: QUERY_HEADER
    });

    if (typeof response === "string") {
      response = JSON.parse(response);
    }

    response.countries_stat.sort(_sortCountries);
    return response.countries_stat.slice(0, numOfCountries);
  } else {
    throw new Error("Must pass a number for number of countries");
  }
}

/**
 * @param {string} countryName country to search for
 * @return {obj}
 * return data for specific country
 */
export async function getSpecificCountryData(countryName) {
  var response = await $.ajax({
    url: COUNTRY_QUERY_URL + countryName,
    method: "GET",
    headers: QUERY_HEADER
  });

  if (typeof response === "string") {
    response = JSON.parse(response);
  }

  return response.latest_stat_by_country[0];
}

export async function getWorldData() {
  let response = await $.ajax({
    url: WORLD_TOTAL_QUERY_URL,
    method: "GET",
    headers: QUERY_HEADER
  });

  if (typeof response === "string") {
    response = JSON.parse(response);
  }

  return {
    confirmed: response.total_cases,
    recovered: response.total_recovered,
    deaths: response.total_deaths
  };
}

// INTERNAL LOGIC
function _sortCountries(firstCountry, secondCountry) {
  var first = parseInt(firstCountry.cases.replace(/,/g, ""));
  var second = parseInt(secondCountry.cases.replace(/,/g, ""));
  // logic for determining top countries
  if (first > second) {
    return -1;
  } else if (first < second) {
    return 1;
  } else {
    return 0;
  }
}
