
const API_KEY = "8a2cb5f78b73457bb6bc5e1973895eb9"
let QUERY_URL = `http://newsapi.org/v2/everything?q=COVID-19&apiKey=${API_KEY}&sortBy=popularity`

/**
 * @param {num} numOfArticles number of articles to return
 * @return {obj}
 * Object containing n number of trending news articles
 */
export async function getTrendingNews(numOfArticles) {

  if (numOfArticles) {
    const response = await $.ajax({
      url: QUERY_URL,
      method: 'GET'
    })

    return response.articles.slice(0, numOfArticles)
  } else {
    throw new Error('Must pass a number for number of articles to retrieve to getTrendingNews')
  }
}

/**
 * @param {num} numOfArticles number of articles to return
 * @param {string} region region to search for artivles with
 * @return {obj}
 * Object containing n number of regional news articles
 */
export function getRegionNews(region, numOfArticles) { }


