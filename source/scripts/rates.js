
var btc_ave_api = {
  '24h': "https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv",
  'ticker': "https://api.bitcoinaverage.com/ticker/USD/"
};


var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 400 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var line = d3.svg.line()
  .x(function(d) { return x(d.datetime); })
  .y(function(d) { return y(d.average); });

var svg = d3.select("#container").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function drawGraph(data) {

  var format = d3.time.format('%Y-%m-%d %H:%M:%S')

  data.forEach(function(d) {
    d.datetime = format.parse(d.datetime);
    console.log(d);
  });

  x.domain(d3.extent(data, function(d) { return d.datetime; }));
  y.domain(d3.extent(data, function(d) { return d.average; }));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

}


d3.csv(btc_ave_api['24h'], function(error, data) {
  console.log(error);

  drawGraph(data);

});


if (window.widget) {
  widget.onshow = randoCircle;
}

function randoCircle() {
  svg.append("circle")
    .attr("cx", 100 * Math.random())
    .attr("cy", 100 * Math.random())
    .attr("r", 10 + 50 * Math.random())
    .style("fill", 'red');
}

