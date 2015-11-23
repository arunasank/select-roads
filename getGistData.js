var myRequest = new XMLHttpRequest();

myRequest.open("GET","https://gist.githubusercontent.com/arunasank/6aa4b8118e049c0e7b8f/raw/5099a1a559727608e1a0e9a5173ffe553516f610/small-chennai.geojson",false);
myRequest.send(null);

var chennaiGeoJSON = myRequest.responseText;

// var chennaiGeoJSON = JSON.stringify(JSON.parse(myRequest.responseText).files["small-chennai.geojson"].content);



