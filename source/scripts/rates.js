
var btc_ave_api = {
  'ticker': "https://api.bitcoinaverage.com/ticker/USD/",

  "24h_sliding": "https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv",
  "all_time": "https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv",
  "global_24h_sliding": "https://api.bitcoinaverage.com/history/USD/per_minute_24h_global_average_sliding_window.csv",
  "monthly_sliding": "https://api.bitcoinaverage.com/history/USD/per_hour_monthly_sliding_window.csv",
  "volumes": "https://api.bitcoinaverage.com/history/USD/volumes.csv"
};

var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 400 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var format, x, y, xAxis, yAxis, line, regression_line, svg, dateLabelFormat;

var range = 'all_time', mode = 'log';

function createAxes() {

  x = d3.time.scale()
    .range([0, width]);

  switch (range) {

    case 'all_time':
      xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(dateLabelFormat)
        .ticks(8)
        .orient("bottom");
      break;

    case '24h_sliding':
      xAxis = d3.svg.axis()
        .scale(x)
        .ticks(8)
        .orient("bottom");
      break;
  }

  switch (mode) {

    case 'log':
      y = d3.scale.log();

      yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat(y.tickFormat(1,"$,.2f"))
        .orient("left");
      break;

    case 'linear':
      y = d3.scale.linear();

      yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat(y.tickFormat("$,.2f"))
        .ticks(8)
        .orient("left");
      break;

  }

  y.range([height, 0]);
}

function init() {

  format = d3.time.format('%Y-%m-%d %H:%M:%S %Z');

  dateLabelFormat = function(d) {
    var mon = d3.time.format('%b')
    if (mon(d) == 'Jan') {
      return d3.time.format('%y')(d);
    }
    return mon(d);
  };


  line = d3.svg.line()
    .x(function(d) { return x(d.datetime); })
    .y(function(d) { return y(d.average); });

  regression_line = d3.svg.line()
    .x(function(d) { return x(d.datetime); })
    .y(function(d, i) { return y(regression(i)); });


  svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  update();
}

var modes = ['log', 'linear'];
var currentMode = 0;
function modeClicked() {
  console.log('mode now = '+mode);
  currentMode = (currentMode + 1) % modes.length;
  mode = modes[currentMode];
  updateGraph();
}

var graph, regression;

function drawGraph(data) {

  createAxes();

  data.forEach(function(d) {
    // date comes in GMT
    d.datetime = format.parse(d.datetime + " +0000");
  });

  var raw_values = data.map(function(d){ return parseFloat(d.average); });
  regression = numbers.statistic.exponentialRegression(raw_values);

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

  graph.append("path")
    .datum(data)
    .attr("class", "regression-line")
    .attr("d", regression_line)
    .style("stroke-dasharray", ("5, 3"));

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

  updateGraph();

  d3.json(btc_ave_api['ticker'], function(error, data) {
    drawReadout(data);
  });

}

function updateGraph() {

  d3.csv(btc_ave_api[range], function(error, data) {
    drawGraph(data);
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

