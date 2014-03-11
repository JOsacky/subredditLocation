var map, heatMapData, heatmap;

var heatMapData = [];
var timeLapseData = [];

var time_laps_loaded = false;

function getCSV(){
    console.log("got here!!!!");
    $.get("uscities.csv",parseCSV);
}

function parseCSV(data){
    var city_locations = {}
    var rows = data.split('\n');
    for(var i =0; i < rows.length; i++){
        var row = rows[i];
        var values = row.split(",");
        var cityname = values[1];
        var numusers = values[13];
        var subreddit_name = values[11];
        //console.log(values[9]);
        var locations = values[9].trim().split(" ");
        var weight = parseFloat(numusers)/100.0;
        //console.log(weight);
        var lat = parseFloat(locations[0])
        var long = parseFloat(locations[2])
        //console.log("lat: " + lat + " long: " + long);
        console.log("weight: " +weight);
        var new_location = new google.maps.LatLng(lat, -long);
        heatMapData.push({location: new_location,weight: 1});

        city_locations[subreddit_name] = new_location
    }
    console.log("finished parsing cities");
    $.get("active_users_totals.csv",function(data){
        var rows = data.split('\n');
        var num_time_entries = rows[0].split(",").length - 1;
        for(var time_index = 0; time_index < num_time_entries; time_index++){
            var time_string = rows[0].split(',')[time_index+1]
            var heat_map_data = [];
            var total_active = 0
            for(var i =2; i < rows.length; i++){
                var row = rows[i].split(',');
                var subreddit_name = row[0];
                var num_active_users = row[1+time_index];
                var location = city_locations[subreddit_name];
                if(!location){
                    continue;
                }
                var weight = parseFloat(num_active_users);
                total_active += weight;
                var data_point = {location: location, weight: weight};
                heat_map_data.push(data_point);
            }
            console.log(total_active);
            time_laps_instant = {
                time: time_string,
                data: heat_map_data
            }
            
            timeLapseData.push(time_laps_instant);
            time_laps_loaded = true;
            //toggle_time_lapse(true);
        }       
    });
}

var current_time_lapse_heatmap;
var time_laps_running = false;
var current_time_laps_time_index = 0;
function toggle_time_lapse(bool){
    time_laps_running = bool;
}

function update_time_lapse (argument) {

    if(time_laps_loaded && time_laps_running){
        current_time_laps_time_index = (current_time_laps_time_index + 1)% timeLapseData.length;
        var time_lapse_instance = timeLapseData[current_time_laps_time_index];
        var data = time_lapse_instance.data;
        var time = time_lapse_instance.time;

        time_lapse_point_array.clear();
        for(var i = 0; i < 80; i++){
            var data_point = data[i];
            if(data_point.weight <= 1 || i > 50){
                //continue;
                console.log("weird weight: " + data_point.weight);
            }
            time_lapse_point_array.push(data_point);

        }

        console.log("updating " + current_time_laps_time_index);
        $('#time').text(time_lapse_instance.time);
    }
}

var time_lapse_point_array = new google.maps.MVCArray();

function initialize() {
    console.log("initialize");
    var tid = setInterval(update_time_lapse, 2000);
    getCSV();
    var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(41.8376, -87.6818),
    mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //var pointArray = new google.maps.MVCArray(locationData);
    
    console.log("creating heat map");
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        radius:10,
        opacity:.6,
        map:map
    });
   

    current_time_lapse_heatmap = new google.maps.visualization.HeatmapLayer({
        data: time_lapse_point_array,
        radius: 30,
        opacity: .6,
        map: map
    });

    var gradient = [
                    'rgba(0,  255, 255, 0)',
                    'rgba(255,0,0, 0.3)',
                    'rgba(255,0,0, 0.5)',
                    'rgba(255,0,0, 0.8)',
                    'rgba(255,0,0, 1.0)'
                    ]
    current_time_lapse_heatmap.set('gradient', gradient);

    time_laps_running = true;
    test_data_point = {location: new google.maps.LatLng(41.8376, -87.6818), weight: 1}
    time_lapse_point_array.push(test_data_point);
}



function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    /*var gradient = [
                    "rgb(0,0,255)",
                    "rgb(0,40,255)",
                    "rgb(0,255,0)",
                    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);*/
}

function changeRadius() {
    //heatmap.set('radius', heatmap.get('radius') ? null : 50);
}

function changeOpacity() {
    //heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}
google.maps.event.addDomListener(window, 'load', initialize);