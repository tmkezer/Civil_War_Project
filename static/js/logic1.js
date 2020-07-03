// // Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// });

// // Initialize all of the LayerGroups we'll be using
// var layers = {
//   COMING_SOON: new L.LayerGroup(),
//   EMPTY: new L.LayerGroup(),
//   LOW: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   OUT_OF_ORDER: new L.LayerGroup()
  
// };
// console.log("Map-1");
// // Create the map with our layers
// var map2 = L.map("map-id", {
//   center: [39.8283, -98.5795],
//   zoom: 4.7,
//   layers: [
//     // layers.COMING_SOON,
//     // layers.EMPTY,
//     // layers.LOW,
//     // layers.NORMAL,
//     // layers.OUT_OF_ORDER
//   ]
// });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map2);

mapboxgl.accessToken = API_KEY;
var map2 = new mapboxgl.Map({
container: 'map-id', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});
