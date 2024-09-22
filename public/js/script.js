const socket = io();

//if your browser supports geolocation
if(navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const {latitude, longitude} = position.coords;
            //simply send this location details to backend
            socket.emit("send-location", {latitude, longitude, id: socket.id});
            console.log(position.coords);
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy : true,
            timeout : 5000,
            maximumAge : 0 //don't cache the data, real time fetching only
        }
    )
}

//using leaflet.js library
//centering at (lan, lon) => (0,0) with zoom level of 10
const map = L.map("map").setView([0,0], 15);

//for viewing of map, we have to set the tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution : "My Place"
}).addTo(map);

//create a markers hashmap
const markers = {};

socket.on("receive-location", (coordinates) => {
    const {id, latitude, longitude} = coordinates;
    map.setView([latitude, longitude]);
    //if current user's marker already present, update it else add it to map
    if(markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if(markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});