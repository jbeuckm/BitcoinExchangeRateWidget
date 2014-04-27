#!/usr/bin/env phantomjs

var page = require('webpage').create();

page.open('source/index.html', function() {

  setTimeout(function(){
    page.render('source/Default.png');
    phantom.exit();
  }, 2000);

});
