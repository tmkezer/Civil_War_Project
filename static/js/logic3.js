// Dataset we will be using to set the height of our rectangles.
console.log("Logic3 Loaded");

setTimeout(function(){  

d3.json("/api/v1.0/bargraph", function(data) {
  
  // console.log(data)
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
  bottom: 10,
  left: 50
};
// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;
// create svg container
var svg = d3.select("#svg-area").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .attr("class", "graph-svg-component");;
// shift everything over by the margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// scale y to chart height
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataNumber)])
  .range([chartHeight, 0]);
  // console.log(d3.max(dataNumber));
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
  .attr("class", "axisRed")
  .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
chartGroup.append("g")
  .attr("class", "axisRed")
  .call(yAxis);
// Append Data to chartGroup
chartGroup.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("x", d => xScale(d.title))
  .attr("y", d => yScale(d.number))
  .attr("width", xScale.bandwidth())
  .attr("height", d => chartHeight - yScale(d.number))
  .attr("fill", function(d) {
    if (d.number > 20000) {
      return "#fe8476";
    } else if (d.number> 18000) {
      return "#fec176";
    }
    else if (d.number > 16000) {
      return "#c5fe76";
    }
    else if (d.number > 14000) {
      return "#81fe76";
    }
    else if (d.number > 12000) {
      return "#76fecc";
    }
    else if (d.number> 10000) {
      return "#76fcfe";
    }
    else if (d.number > 8000) {
      return "#76cefe";
    }
    else if (d.number > 6000) {
      return "#767dfe";
    }
    else if (d.number > 4000) {
      return "#a176fe";
    }
    else if (d.number > 2000) {
      return "#ee76fe";
    }
    return "#fe7676";
  })
  .on("mousemove", function(d){
    tooltip
    .style("left", d3.event.pageX - 50 + "px")
    .style("top", d3.event.pageY - 70 + "px")
    .style("display", "inline-block")
    .html("Title: " + d.title + "<br/>" + "Monuments Erected: " + d.number)
   ;
  //  console.log(d);
  })
  .on("mouseout", function(){ tooltip.style("display", "none");});
// console.log("Logic3 file");
 // Step 1: Initialize Tooltip
var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "toolTip");


});

}, 3500);
 