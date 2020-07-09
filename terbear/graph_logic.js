// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// Initialise a X axis:
var x = d3.scaleLinear().range([0, width])
var xAxis = d3.axisBottom().scale(x).tickFormat(d3.format("d"));
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
    .attr("class", "myYaxis")

csv1 = "test.csv"
csv2 = "test2.csv"

var parseTime = d3.timeParse("%Y");

var tooltip = d3.select("#scatter")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-size", "10px")


// Create a function that takes a dataset as input and update the plot:
function update(csv) {
    d3.csv(csv, function (monumentData) {

        monumentData.forEach(function (data) {
            data.textyear = +data.year;
            console.log("textyear value");
            console.log(data.textyear);
            data.year = parseTime(data.year);
            console.log("year value")
            console.log(data.year);
            data.monuments_erected = +data.monuments_erected;
        });

        var xTimeScale = d3.scaleLinear()
            .range([0, width])
            .domain(d3.extent(monumentData, data => data.textyear));

        var yLinearScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(monumentData, data => data.monuments_erected)]);

        function xScale(monumentData) {
            // create scales
            var xLinearScale = d3.scaleLinear()
                .domain([d3.min(monumentData, d => d.textyear) * 0.8,
                d3.max(monumentData, d => d.textyear) * 1.2
                ])
                .range([0, width]);

            return xLinearScale;

        }

        var xLinearScale = xScale(monumentData);

        var bottomAxis = d3.axisBottom(xLinearScale);
        

        // Create the X axis:
        x.domain(d3.extent(monumentData, data => data.textyear));
        svg.selectAll(".myXaxis").transition()
            .duration(3000)
            .call(xAxis);

        // create the Y axis
        y.domain([0, d3.max(monumentData, function (d) { return d.monuments_erected })]);
        svg.selectAll(".myYaxis")
            .transition()
            .duration(3000)
            .call(yAxis);

        // Create a update selection: bind to the new data
        var u = svg.selectAll(".lineTest")
            .data([monumentData], function (d) { return d.textyear });

        // Updata the line
        u
            .enter()
            .append("path")
            .attr("class", "lineTest")
            .merge(u)
            .transition()
            .duration(3000)
            .attr("d", d3.line()
                .x(function (d) { return x(d.textyear); })
                .y(function (d) { return y(d.monuments_erected); }))
            .attr("fill", "rgb(" + 173 + "," + 242 + "," + 239 + ")")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)

        var mousemove = function (d) {
            tooltip
                .style("display", "block")
                .html("Year: " + d.textyear + "<br/>" + "Monuments Erected: " + d.monuments_erected)
                .style("left", (d3.mouse(this)[0] + 90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (d3.mouse(this)[1]) + "px")
                .style("opacity", 0.9)
        }

        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        var mouseleave = function (d) {
            tooltip
                // .transition()
                // .duration(200)
                .style("opacity", 0)
                .style("display", "none")
        }

        var c = svg.selectAll("circle");

        c
            .data(monumentData)
            .enter()
            .append("circle")
            .merge(c)
            .transition()
            .duration(3000)
            .attr("cx", d => xTimeScale(d.textyear))
            .attr("cy", d => yLinearScale(d.monuments_erected))
            .attr("r", 2)
            .attr("fill", "black")
            .attr("opacity", ".5");



        c
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .on("mouseover", function (d) {
                d3.select(this).attr("r", 5).style("opacity", 1);
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 2).style("opacity", .5);
            });
    })
};

// At the beginning, I run the update function on the first dataset:
update(csv1);
update(csv1);