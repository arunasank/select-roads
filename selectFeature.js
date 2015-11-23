// var selectedButton = "s";

// $('#flooded').click(function(){
//     alert('hello!');
//     selectedButton = 'f';
//     $('#flooded').css('background','rgba(0, 0, 255, 0.5)');
//     $('#safe').css('fill-color','rgba(0, 255,0, 1)');
// });

// $('#safe').click(function(){
//     selectedButton = 's';
//     $('#safe').css('fill-color','rgba(0, 255,0, 0.5)');
//     $('#flooded').css('fill-color','rgba(0, 0, 255, 1)');
// });

// var roadColour = (selectedButton == "s") ? "#00ff00" : "#ff0000";

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmFzYW5rIiwiYSI6ImRKNlNQa3MifQ.SIx-g-J1oWWlP4grTXopcg';

mapboxgl.util.getJSON('https://api.mapbox.com/styles/v1/mapbox/streets-v8?access_token=' + mapboxgl.accessToken, function (err, style) {
    if (err) throw err;

    var roadLayers = [
    "road",
    "road-main",
    "road-construction",
    "road-rail",
    "road-motorway",
    "road-oneway-arrows-trunk",
    "road-trunk",
    "road-oneway-arrows-other",
    "road-street",
    "road-service-driveway",
    "road-path",
    "road-label-large",
    "road-label-medium",
    "road-label-small"
    ];

    style.layers.forEach(function (layer) {
        layer.interactive = true;
    });
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: style, //stylesheet location
        center: [80.27294,13.06101], // starting position
        zoom: 15 // starting zoom
    });



    map.on('style.load', function () {
        var selectedRoadsGeoJSON = {};
        selectedRoadsGeoJSON['type'] = 'FeatureCollection';
        selectedRoadsGeoJSON['features'] = [];
        var selectedRoadsSource = new mapboxgl.GeoJSONSource({"data":selectedRoadsGeoJSON});
        map.addSource("selected-roads",selectedRoadsSource);
        map.addLayer({
                    "id": "selected-roads",
                    "type": "line",
                    "source": "selected-roads",
                    "paint": {
                        "line-color": "#ff69b4",
                        "line-width": 5
                    }
                });
        
        map.on('click', function (e) {
            map.featuresAt(e.point, {radius: 5, includeGeometry: true}, function (err, features) {
                if (err) throw err;
                for(var i=0; i < features.length; i++){
                    if(features[i].layer["type"]=="line" && (features[i].geometry["type"] == "LineString"
                        || features[i].geometry["type"] == "MultiLineString")){
                        console.log("i " + JSON.stringify(features[i]));
                        var tempObj = {};
                        tempObj.type = features[i].type;
                        tempObj.geometry = features[i].geometry;
                        tempObj.properties = features[i].properties;
                        selectedRoadsGeoJSON['features'].push(tempObj);
                        break;
                    }

                }
                selectedRoadsSource.setData(selectedRoadsGeoJSON);
                
            });

        });
    });



});