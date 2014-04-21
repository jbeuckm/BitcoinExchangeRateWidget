var debug = true;
// var debug = false;

// writes the string passed to it to the page
function writeDebug(s) {
  if (window.widget) {
    alert(s);
  } else {
    document.getElementById("debug").innerHTML += s + "<br\/>";
  }
}

// writes all of the properties of the object passed to it
function revealObject(o) {
  for (p in o) {
    writeDebug(p);
  }
}

// if debug is set to true, this will show the debug div
function init() {
  if (debug) document.getElementById("debug").style.display = "block";
}

window.onload = init;
