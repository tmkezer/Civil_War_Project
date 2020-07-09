// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

// set the dimensions and margins of the graph
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
// Parse the Data
d3.csv("monuments_categorized.csv"), function (data) {

  // List of subcategorys = header of the csv files = soil condition here
  var subcategorys = data.columns.slice(1)

  // List of categorys = species here = value of the first column called category -> I show them on the X axis
  var categorys = d3.map(data, function (d) { return (d.category) }).keys()

  // Add X axis
  var x = d3.scaleBand()
    .domain(categorys)
    .range([0, width])
    .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 60])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subcategory
  var color = d3.scaleOrdinal()
    .domain(subcategorys)
    .range(['#e41a1c', '#377eb8', '#4daf4a'])

  //stack the data? --> stack per subcategory
  var stackedData = d3.stack()
    .keys(subcategorys)
    (data)

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = category per category
    .data(stackedData)
    .enter().append("g")
    .attr("fill", function (d) { return color(d.key); })
    .selectAll("rect")
    // enter a second time = loop subcategory per subcategory to add all rectangles
    .data(function (d) { return d; })
    .enter().append("rect")
    .attr("x", function (d) { return x(d.data.category); })
    .attr("y", function (d) { return y(d[1]); })
    .attr("height", function (d) { return y(d[0]) - y(d[1]); })
    .attr("width", x.bandwidth())
};

