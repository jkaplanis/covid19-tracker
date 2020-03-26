let SUMMARY_QUERY_URL = "https://api.covid19api.com/summary";

/**
 * @param {num} numOfCountries number of countries to return
 * @returns {obj}
 * returns n number of top countries affected by COIVD-19
 */
export async function getTopCountryData(numOfCountries) {
  if (numOfCountries) {
    const response = await $.ajax({
      url: SUMMARY_QUERY_URL,
      method: "GET"
    });

    response.Countries.sort(_sortCountries);
    return response.Countries.slice(0, numOfCountries);
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
  const response = await $.ajax({
    url: SUMMARY_QUERY_URL,
    method: "GET"
  });

  var returnedCountryObj = null;
  response.Countries.forEach(function(obj) {
    if (countryName.toLowerCase() === obj.Country.toLowerCase()) {
      returnedCountryObj = obj;
    }
  });

  return returnedCountryObj;
}

export async function getWorldData() {
  const response = await $.ajax({
    url: SUMMARY_QUERY_URL,
    method: "GET"
  });

  var confirmed = 0;
  var recovered = 0;
  var deaths = 0;
  response.Countries.forEach(function(country) {
    confirmed += country.TotalConfirmed;
    recovered += country.TotalRecovered;
    deaths += country.TotalDeaths;
  });

  return {
    confirmed: confirmed,
    recovered: recovered,
    deaths: deaths
  };
}

// INTERNAL LOGIC
function _sortCountries(firstCountry, secondCountry) {
  var first = parseInt(firstCountry.TotalConfirmed);
  var second = parseInt(secondCountry.TotalConfirmed);
  // logic for determining top countries
  if (first > second) {
    return -1;
  } else if (first < second) {
    return 1;
  } else {
    return 0;
  }
}
