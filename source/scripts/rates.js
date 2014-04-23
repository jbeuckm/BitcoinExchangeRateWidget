
var btc_ave_api = {
  '24h': "https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv",
  'ticker': "https://api.bitcoinaverage.com/ticker/USD/"
};

var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 400 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var format, x, y, xAxis, yAxis, line, svg;


function init() {

  format = d3.time.format('%Y-%m-%d %H:%M:%S %Z');

  x = d3.time.scale()
    .range([0, width]);

  y = d3.scale.linear()
    .range([height, 0]);

  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  line = d3.svg.line()
    .x(function(d) { return x(d.datetime); })
    .y(function(d) { return y(d.average); });


  svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  update();
}


var graph;

function drawGraph(data) {

  data.forEach(function(d) {
    // date comes in GMT
    d.datetime = format.parse(d.datetime + " +0000");
  });

  x.domain(d3.extent(data, function(d) { return d.datetime; }));
  y.domain(d3.extent(data, function(d) { return d.average; }));

  if (graph) {
    graph.remove();
  }
  graph = svg.append("g");

  graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  graph.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  graph.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
    .tickSize(-height, 0, 0)
    .tickFormat("")
  );

  graph.append("g")
    .attr("class", "grid")
    .call(make_y_axis()
    .tickSize(-width, 0, 0)
    .tickFormat("")
  );

  graph.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

}

function drawReadout(data) {

  d3.select("#readout").html("");

  d3.select("#readout").append("div")
    .attr("id", "last-price")
    .html('Last: $'+data.last.toFixed(2));
  d3.select("#readout").append("div")
    .attr("id", "ask-price")
    .html('Ask: $'+data.ask.toFixed(2));
  d3.select("#readout").append("div")
    .attr("id", "bid-price")
    .html('Bid: $'+data.bid.toFixed(2));

}

function update() {

  d3.csv(btc_ave_api['24h'], function(error, data) {

    drawGraph(data);

  });

  d3.json(btc_ave_api['ticker'], function(error, data) {
    drawReadout(data);
  });

}

function make_x_axis() {
  return d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(8)
}

function make_y_axis() {
  return d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(8)
}


if (window.widget) {
  widget.onshow = update;
}

