// Creating map object
var myMap = L.map("map", {
  // center: [44.9788, -93.2560],
  // center: [44.9537, -93.0900],
  center: [44.9637, -93.1700],

    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  
  // Use this link to get the geojson data.
  var link1 = "static/data/Minneapolis_neighborhoods.geojson";
  var link2 = "static/data/StPaul_neighborhoods.geojson";

  // Grabbing our GeoJSON data..
  d3.json(link1).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });
  d3.json(link2).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });

  