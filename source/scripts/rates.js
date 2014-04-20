
d3.csv("https://coinbase.com/api/v1/prices/historical")
  .row(function(d) { return {key: d.key, value: +d.value}; })
  .get(function(error, rows) {

    d3.select(".helloText").html('hi');

    console.log(rows);
  });

