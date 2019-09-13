// @TODO: YOUR CODE HERE!
    
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //iMPORT CSV
d3.csv('data.csv').then(function(plotdata){
    //parse data
    plotdata.foreach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    })

    //create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(plotdata, d => d.poverty))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain(d3.extent(plotdata, d => d.healthcare))
        .range([0, height]);
    

// Creating axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

// Append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

// Creating circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(plotdata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "13")
        .attr("fill", "blue")
        .attr("opacity", ".5");



// Creating axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90")
        .attr("y", 0 - margin.left +40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

})
