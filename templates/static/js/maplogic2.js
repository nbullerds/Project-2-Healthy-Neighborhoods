console.log("maplogic2.js is loaded");

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


// Links to get the geojson and csv data.
var link1 = "static/data/Minneapolis_neighborhoods.geojson";
var link2 = "static/data/StPaul_neighborhoods.geojson";
var places = "schema/Places_data_backup.csv"
var neighborhoods = "schema/Neighborhoods_data_backup.csv"
var walkscore = "data/MSP_neighborhoods_walkability_address.csv"


// Grab Minneapolis GeoJSON data.
d3.json(link1).then(function (data) {
  // Create a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "#64b5f6",
        fillOpacity: 0.5,
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
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());

          console.log("Success of Function");

          var population = d3.select("#population");
          var households = d3.select("#households");
          var income = d3.select("#income");
          var unemployment = d3.select("#unemployment");
          
          // var neighborhood = d3.select("#popup-testing").text();
          // console.log(neighborhood);
          
          population.html("Click Success"); //populates table td
          households.html("Click Success"); //populates table td
          income.html("Click Success"); //populates table td
          unemployment.html("Click Success"); //populates table td

    
        }
      });
      // Give each feature a pop-up with information pertinent to it
      // layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3> <hr> <p>" + "demographics here or in a table? Population, Households, Ave Income, Unemployment" + "</p>");
      layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3>");
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
        fillColor: "#1976d2",
        fillOpacity: 0.5,
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
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Give each feature a pop-up with information pertinent to it
      // layer.bindPopup("<h3>" + feature.properties.name2 + "</h3> <hr> <p>" + "demographics here or in a table? Population, Households, Ave Income, Unemployment" + "</p>");
      layer.bindPopup("<h3>" + feature.properties.name2 + "</h3>");
    }
  }).addTo(myMap);
});


// Add layer control
// Create basemap object
var baseMaps = {
  "Map": map
};

// Initialize layer groups -- data from places csv
// need correct names
var layers = {
  supermarket: new L.LayerGroup(),
  park: new L.LayerGroup(),
  gym: new L.LayerGroup,
  restaurant: new L.LayerGroup,
  school: new L.LayerGroup,
  church: new L.LayerGroup,
  transit_station: new L.LayerGroup
};

// Create overlay object to add to layer control
var overlayMaps = {
  "Churches": layers.church,
  "Fitness Centers": layers.gym,
  "Grocery Stores": layers.supermarket,
  "Parks": layers.park,
  "Restaurants": layers.restaurant,
  "Schools": layers.school,
  "Transit Stations": layers.transit_station
};

// Add layer control to map
// Null to hide the baseMap
L.control.layers(null, overlayMaps, {
  //collapsed:false
}).addTo(myMap);


// // Omnivore will AJAX-request this file behind the scenes and parse it:
// // note that there are considerations:
// // - The CSV file must contain latitude and longitude values, in column
// //   named roughly latitude and longitude
// // - The file must either be on the same domain as the page that requests it,
// //   or both the server it is requested from and the user's browser must
// //   support CORS.
// omnivore.csv('../schema/Places_forMap.csv')
//     .on('ready', function(layer) {
//       console.log("success");
//         // An example of customizing marker styles based on an attribute.
//         // In this case, the data, a CSV file, has a column called 'state'
//         // with values referring to states. Your data might have different
//         // values, so adjust to fit.
//         this.eachLayer(function(marker) {
//             if (marker.toGeoJSON().properties.placeType === 'supermarket') {
//                 // The argument to L.mapbox.marker.icon is based on the
//                 // simplestyle-spec: see that specification for a full
//                 // description of options.
//                 marker.setIcon(L.mapbox.marker.icon({
//                     'marker-color': '#ff8888',
//                     'marker-size': 'large'
//                 }));
//             } else {
//                 marker.setIcon(L.mapbox.marker.icon({}));
//             }
//             // Bind a popup to each icon based on the same properties
//             marker.bindPopup(marker.toGeoJSON().properties.city + ', ' +
//                 marker.toGeoJSON().properties.placeType);
//         });
//     })
//     .addTo(map);








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