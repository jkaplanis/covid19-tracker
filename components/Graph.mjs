export default function buildGraphEl(
  sectionWidth = 600,
  data = []
  // maxValue
) {
  const dataSet = [];
  let maxValue = 0;

  data.forEach((country) => {
    let deaths = removeCommas(country.deaths);
    maxValue = deaths > maxValue ? deaths : maxValue;

    dataSet.push([country.country_name, deaths]);
  });

  dataSet.sort((a, b) => {
    return b[1] - a[1];
  });

  let x = d3.scaleLinear().domain([0, maxValue]).range([0, sectionWidth]);

  let y = d3
    .scaleBand()
    .domain(d3.range(dataSet.length))
    .range([0, 20 * dataSet.length]);

  const svg = d3
    .create("svg")
    .attr("width", sectionWidth)
    .attr("height", y.range()[1])
    .attr("font-family", "sans-serif")
    .attr("font-size", "10")
    .attr("text-anchor", "start");

  const bar = svg
    .selectAll("g")
    .data(dataSet)
    .join("g")
    .attr("transform", (d, i) => `translate(0,${y(i)})`);

  bar
    .append("rect")
    .attr("fill", "#f84828")
    .attr("width", (d) => x(d[1]))
    .attr("height", y.bandwidth() - 1);

  bar
    .append("text")
    .attr("fill", "white")
    .attr("x", 0)
    .attr("y", y.bandwidth() / 2)
    .attr("dy", "0.5em")
    .text((d) => d[0]);

  buildXAxisLabel(maxValue, sectionWidth);

  return svg.node();
}

function buildXAxisLabel(maxValue, sectionWidth) {
  $("#res").empty();
  // create svg element
  let xAxis = d3
    .select("#res")
    .append("svg")
    .attr("width", sectionWidth)
    .attr("height", 50);

  // Create the scale
  let xscale = d3
    .scaleLinear()
    .domain([0, maxValue]) // This is what is written on the Axis: from 0 to 100
    .range([2, sectionWidth]); // This is where the axis is placed: from 100px to 800px

  // Draw the axis
  xAxis
    .append("g")
    .attr("transform", "translate(0,10)") // This controls the vertical position of the Axis
    .call(d3.axisBottom(xscale));
}

function removeCommas(str) {
  while (str.search(",") >= 0) {
    str = (str + "").replace(",", "");
  }
  return parseInt(str);
}
