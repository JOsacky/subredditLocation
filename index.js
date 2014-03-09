var map, heatMapData, heatmap;

var heatMapData = [];

function getCSV(){
    console.log("got here!!!!");
    $.get("asdf.csv",parseCSV);
}
function parseCSV(data){
    rows = data.split('\n');
    for(i =0; i < rows.length; i++){
        row = rows[i];
        values = row.split(",");
        cityname = values[1];
        numusers = values[13];
        console.log(values[9]);
        locations = values[9].trim().split(" ");
        weight = parseFloat(numusers)/1000.0;
        lat = parseFloat(locations[0])
        long = parseFloat(locations[2])
        console.log("lat: " + lat + " long: " + long);
        console.log("weight: " +weight);
        new_location = new google.maps.LatLng(lat, -long);
        heatMapData.push({location: new_location,weight: .5});
    }
    console.log("finished parsing");
    initialize();
    //google.maps.event.addDomListener(window, 'load', initialize);
}
function initialize() {
    var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(41.8376, -87.6818),
    mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              mapOptions);
    
    //var pointArray = new google.maps.MVCArray(locationData);
    
    heatmap = new google.maps.visualization.HeatmapLayer({
                                                         data: heatMapData,
                                                         radius:3,
                                                         opacity:1,
                                                         map:map
                                                         });
    
    //heatmap.setMap(map);
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
                    "rgb(0,0,255)",
                    "rgb(0,255,255)",
                    "rgb(0,255,0)",
                    "yellow",
                    "rgb(255,0,0)"
                    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 50);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

getCSV();
