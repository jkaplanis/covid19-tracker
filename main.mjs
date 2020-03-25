import { getTrendingNews, getRegionNews } from './logic/newsAPI.mjs'
import { getTopCountryData, getSpecificCountryData } from './logic/covid-api-calls.mjs'

// Start the app logic
init()

function init() {

  getTrendingNews(5)
    .then(articles => console.log(articles))
    .catch(err => console.log(err))

}