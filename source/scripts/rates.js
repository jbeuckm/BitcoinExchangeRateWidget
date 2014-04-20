
//  d3.csv("https://coinbase.com/api/v1/prices/historical")


//d3.csv("https://api.bitcoinaverage.com/ticker/USD/")
d3.csv("https://api.bitcoinaverage.com/history/USD/per_minute_24h_sliding_window.csv")
  .row(function(d) {

    console.log(d);
    d3.select(".helloText").html(d.average);

  })
  .get(function(error, rows) {
    console.log(rows);
  });

