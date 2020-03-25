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
 * @param {string} country country to search for
 * @return {obj}
 * return data for specific country
 */
export function getSpecificCountryData(country) {
  console.log("GETTING COUNTRY SPECIFIC DATA");
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
