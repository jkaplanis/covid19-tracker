import { getTrendingNews, getRegionNews } from './logic/newsAPI.mjs'
import { getTopCountryData, getSpecificCountryData } from './logic/covid-api-calls.mjs'

// Start the app logic
init()

function init() {

  // THIS CALL IS USED FOR GETTING A CERTAIN NUMBER OF TRENDING NEWS ARTICLES 
  // RELATED TO COVID-19
  // getTrendingNews(5)
  //   .then(articles => console.log(articles))
  //   .catch(err => console.log(err))

}