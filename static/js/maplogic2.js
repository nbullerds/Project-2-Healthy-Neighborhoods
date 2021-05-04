// Create map object
var myMap = L.map("map", {
  // center: [44.9788, -93.2560],
  // center: [44.9537, -93.0900],
  center: [44.9637, -93.1700],
  zoom: 11
});


// Add tile layer
var map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Links to get the geojson data.
var link1 = "static/data/Minneapolis_neighborhoods.geojson";
var link2 = "static/data/StPaul_neighborhoods.geojson";


// Grab Minneapolis GeoJSON data.
d3.json(link1).then(function (data) {
  // Create a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "darkblue",
        fillOpacity: 0.3,
        weight: 1.5
      };
    },
    // Call on each feature
    onEachFeature: function (feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.3
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Give each feature a pop-up with information pertinent to it
      layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3> <hr> <p>" + "demographics here or in a table? Population, Households, Ave Income, Unemployment" + "</p>");

    }
  }).addTo(myMap);
});


// Grab StPaul GeoJSON data.
d3.json(link2).then(function (data) {
  // Create a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "red",
        fillOpacity: 0.3,
        weight: 1.5
      };
    },
    // Call on each feature
    onEachFeature: function (feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.3
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Give each feature a pop-up with information pertinent to it
      layer.bindPopup("<h3>" + feature.properties.name2 + "</h3> <hr> <p>" + "demographics here or in a table? Population, Households, Ave Income, Unemployment" + "</p>");

    }
  }).addTo(myMap);
});


// Add layer control
// Create basemap object
var baseMaps = {
  "Map": map
};

// Initialize layer groups
// need correct names
var layers = {
  Grocery: new L.LayerGroup(),
  Parks: new L.LayerGroup(),
  FitnessCenters: new L.LayerGroup,
  Restaurants: new L.LayerGroup,
  Schools: new L.LayerGroup,
  Churches: new L.LayerGroup
};

// Create overlay object to add to layer control
var overlayMaps = {
  "Grocery Stores": layers.Grocery,
  "Parks": layers.Parks,
  "Fitness Centers": layers.FitnessCenters,
  "Restaurants": layers.Restaurants,
  "Schools": layers.Schools,
  "Churches": layers.Churches
};

// Add layer control to map
// Null to hide the baseMap
L.control.layers(null, overlayMaps, {
  //collapsed:false
}).addTo(myMap);

// Benji's code sample
// function whenthingisclicked(event){
//   event.somethingorother

//   updateToNeighborhood(neighborhoodthatwasclickedupon)
// }

// function updateToNeighborhood(neighborhood){
//   var csv1, csv2, csv3;
//   function doAThing(){
//     if(sourcesRecived === 3){
//       //do our stuff here

//     }
//   }
//   kerry.csv('static/data/bycsv.csv', (data) => {
//     csv1 = data;
//     doAThing();
//   });
//   kerry.csv('static/data/mycsv2.csv', (data) => {
//     csv2 = data;
//     doAThing();
//   });
// }

/// items to occupy dropdown
//Grocery
//Parks
//Fitness Centers
//Restaurants
//Schools
//Churches