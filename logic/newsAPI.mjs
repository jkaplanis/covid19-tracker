const API_KEY = "8a2cb5f78b73457bb6bc5e1973895eb9";
let QUERY_URL = `https://newsapi.org/v2/top-headlines?q=COVID-19&apiKey=${API_KEY}`;
let REGION_QUERY_URL = `https://newsapi.org/v2/top-headlines?q=COVID-19&apiKey=${API_KEY}&country=`;

/**
 * @param {num} numOfArticles number of articles to return
 * @return {obj}
 * Object containing n number of trending news articles
 */
export async function getTrendingNews(numOfArticles) {
  if (numOfArticles) {
    const response = await $.ajax({
      url: QUERY_URL,
      method: "GET"
    });

    console.log(response);

    return response.articles.slice(0, numOfArticles);
  } else {
    throw new Error(
      "Must pass a number for number of articles to retrieve to getTrendingNews"
    );
  }
}

/**
 * @param {num} numOfArticles number of articles to return
 * @param {string} region region to search for artivles with (2 letter alpha ISO 3166-1)
 * @return {obj}
 * Object containing n number of regional news articles
 */
export async function getRegionNews(region, numOfArticles) {
  if (numOfArticles && region) {
    const response = await $.ajax({
      url: REGION_QUERY_URL + region,
      method: "GET"
    });

    return response.articles.slice(0, numOfArticles);
  } else {
    throw new Error(
      "Must pass a number for number of articles and a valid region to retrieve to getRegionNews"
    );
  }
}
