// Create an array of each country's numbers
var non_war = Object.values(data.non_war);
var war = Object.values(data.war);

// Create an array of music provider labels
var labels = Object.keys(data.non_war);
var labels1 = Object.keys(data.war);

// Display the default plot
function init() {
  var data = [{
    values: war,
    labels: labels1,
    type: "pie"
  }];

  var layout = {
    height: 400,
    width: 700
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data = [];

  if (dataset == 'non_war') {
      data = non_war,
      labels = labels;
  }
  else if (dataset == 'war') {
      data = war
      labels = labels1;
  }
  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();
