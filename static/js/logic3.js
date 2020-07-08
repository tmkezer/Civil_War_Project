// Dataset we will be using to set the height of our rectangles.
console.log("Logic3 Loaded");
d3.json("/api/v1.0/bargraph", function(data) {
  
  // data
  var dataNumber = [];
  var dataTitle = [];

  for (var j = 0; j < data.length; j++) {
    dataNumber.push(data[j].number);
    dataTitle.push(data[j].title);
  }
// console.log(dataNumber);
// console.log(dataTitle);
// svg container
var svgHeight = 400;
var svgWidth = 700;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#svg-area").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scale y to chart height
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataNumber)])
  .range([chartHeight, 0]);
  console.log(d3.max(dataNumber));

// scale x to chart width
var xScale = d3.scaleBand()
  .domain(dataTitle)
  .range([0, chartWidth])
  .padding(0.05);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`,)
  .call(xAxis)
  .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

chartGroup.append("g")
  .call(yAxis);

// Append Data to chartGroup
chartGroup.selectAll(".bar")
  .data(dataNumber)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("x", (d, i) => xScale(dataTitle[i]))
  .attr("y", d => yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => chartHeight - yScale(d))
  .attr("fill", "green")
  .on("mousemove", function(d){
    tooltip
    .style("left", d3.event.pageX - 50 + "px")
    .style("top", d3.event.pageY - 70 + "px")
    .style("display", "inline-block")
    .html((`# of Monuments: ${d}`));
  })
  .on("mouseout", function(d){ tooltip.style("display", "none");});;

console.log("Logic3 file");
 // Step 1: Initialize Tooltip

var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "toolTip");


});


 