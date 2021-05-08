console.log("maplogic3.js is loaded");

// ---------------------------------------------------------------------- //
//Function for Minneapolis Click Event
function areaClickEvent(event) {
  myMap.fitBounds(event.target.getBounds());

  var neighborhoodName = event.sourceTarget.feature.properties.BDNAME;

  console.log("SHOWING CLICKED NEIGHBORHOOD");
  console.log(neighborhoodName);

  kerry.csv('../schema/Neighborhoods_data_backup.csv', function (data) {

    var myhooddata = data.find(x => x.Neighborhood === neighborhoodName)

    console.log("MY HOOD DATA");
    console.log(data);

    //Demographics table
    var name = d3.select("#demoName");
    var population = d3.select("#population");
    var households = d3.select("#households");
    var income = d3.select("#income");
    var unemployment = d3.select("#unemployment");
    var transit = d3.select("#transit");
    var walk = d3.select("#walk");

    name.html(myhooddata.Neighborhood); //populates Demographics h3
    population.html(myhooddata.NeighborhoodPopulation); //populates table td
    households.html(myhooddata.NeighborhoodHouseholds); //populates table td
    income.html(myhooddata.MedianIncome); //populates table td
    unemployment.html((myhooddata.UnemploymentPrct * 100).toFixed(2)); //populates table td
    transit.html((myhooddata.PublicTransportPrct * 100).toFixed(2)); //populates table td
    walk.html((myhooddata.WalkBiketoWorkPrct * 100).toFixed(2)); //populates table td

    //Pie chart
    var name = d3.select("#pieName");
    name.html(myhooddata.Neighborhood); //populates Demographics h3

    //NEED CLICK EVENT FOR PIE CHART
    //Line 111 has the click
    //How to add that to pie.js to update the neighborhood?
    //Do I need to put the pie.js code here instead of accessing the javascript from another file?
    //Done with a function? https://gis.stackexchange.com/questions/121482/click-events-with-leaflet-and-geojson

  });
}


// // ---------------------------------------------------------------------- //
// //Function for St Paul Click Event
// function areaClickEvent(event) {
//   myMap.fitBounds(event.target.getBounds());

//   var neighborhoodName = event.sourceTarget.feature.properties.name2;

//   console.log("SHOWING CLICKED NEIGHBORHOOD");
//   console.log(neighborhoodName);

//   kerry.csv('../schema/Neighborhoods_data_backup.csv', function (data) {

//     var myhooddata = data.find(x => x.Neighborhood === neighborhoodName)

//     console.log("MY HOOD DATA");
//     console.log(data);

//     //Demographics table
//     var name = d3.select("#demoName");
//     var population = d3.select("#population");
//     var households = d3.select("#households");
//     var income = d3.select("#income");
//     var unemployment = d3.select("#unemployment");
//     var transit = d3.select("#transit");
//     var walk = d3.select("#walk");

//     name.html(myhooddata.Neighborhood); //populates Demographics h3
//     population.html(myhooddata.NeighborhoodPopulation); //populates table td
//     households.html(myhooddata.NeighborhoodHouseholds); //populates table td
//     income.html(myhooddata.MedianIncome); //populates table td
//     unemployment.html((myhooddata.UnemploymentPrct * 100).toFixed(2)); //populates table td
//     transit.html((myhooddata.PublicTransportPrct * 100).toFixed(2)); //populates table td
//     walk.html((myhooddata.WalkBiketoWorkPrct * 100).toFixed(2)); //populates table td

//     //Pie chart
//     var name = d3.select("#pieName");
//     name.html(myhooddata.Neighborhood); //populates Demographics h3

//     //NEED CLICK EVENT FOR PIE CHART
//     //Line 111 has the click
//     //How to add that to pie.js to update the neighborhood?
//     //Do I need to put the pie.js code here instead of accessing the javascript from another file?
//     //Done with a function? https://gis.stackexchange.com/questions/121482/click-events-with-leaflet-and-geojson

//   });
// }


// ---------------------------------------------------------------------- //
// Generate the base map
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
var link1 = "../static/data/Minneapolis_neighborhoods.geojson";
var link2 = "../static/data/StPaul_neighborhoods.geojson";
var places = "../static/data/Places_forMap.geojson"

// console.log(places);




// ---------------------------------------------------------------------- //
// Function to grab Minneapolis GeoJSON data.
kerry.json(link1, function (data) {
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
        click: areaClickEvent,
      });

      // Give each feature a pop-up with information pertinent to it
      // layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3> <hr> <p>" + "demographics here or in a table? Population, Households, Ave Income, Unemployment" + "</p>");
      layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3>");
    }
  }).addTo(myMap);
});






// ---------------------------------------------------------------------- //
// Function to grab StPaul GeoJSON data.
kerry.json(link2, function (data) {
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
        click: areaClickEvent,
      });

      // Give each feature a pop-up with information pertinent to it
      // layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3> <hr> <p>" + "demographics here or in a table? Population, Households, Ave Income, Unemployment" + "</p>");
      layer.bindPopup("<h3>" + feature.properties.name2 + "</h3>");
    }
  }).addTo(myMap);
});






// ---------------------------------------------------------------------- //
// Add layer control and overlay for places markers
// Create basemap object
var baseMaps = {
  "Map": map
};

//Function to create overlay object to add to layer control
//Grab Places geojson
kerry.json(places, function (data) {

  // //Function to color markers
  // function getColor(colors) {
  //   colors = "supermarket" ? "red" :
  //     colors = "park" ? "blue" :
  //       colors = "gym" ? "green" :
  //         colors = "school" ? "yellow" :
  //           colors = "church" ? "orange" :
  //             colors = "transit_station" ? "purple" : "purple";
  // };

  // console.log("LOAD PLACE COLORS")
  // console.log(getColor);

  //Loop through data and grab features data
  var placeFeatures = data.features;

  console.log("Places geojson features");
  console.log(placeFeatures);

  var typeToMarkers = {};
  // var markers = [];
  for (var i = 0; i < placeFeatures.length; i++) {

    //variables for markers
    var coordinates = placeFeatures[i].geometry.coordinates;
    var type = placeFeatures[i].properties.placeType;

    var markers = typeToMarkers[type];
    if (markers === undefined)
      markers = typeToMarkers[type] = [];

    // if (i == 0) {
    //   console.log("See places coordinates");
    //   console.log(coordinates);
    //   console.log("See places type");
    //   console.log(type);
    // }

    // markers.push(L.marker([coordinates[1], coordinates[0]], {
    //     fillColor: getColor(colors)
    // }));

    // markers.push(L.marker([coordinates[1], coordinates[0]]));

    markers.push(L.marker(([coordinates[1], coordinates[0]]), {
      style: (function (PlaceFeatures) {
        switch (PlaceFeatures.PlaceType) {
          case "supermarket": return { color: "red" };
          case "park": return { color: "blue" };
          case "gym": return { color: "green" };
          case "school": return { color: "purple" };
          case "church": return { color: "lightblue" };
          case "transit_station": return { color: "gray" };
        }
      })
    }));
  }

  var newLayer = L.layerGroup(markers);
  myMap.addLayer(newLayer);

  var overlayMaps = {
    "<span style='color: darkred'>Churches</span>": L.layerGroup(typeToMarkers.church),
    "<span style='color: darkblue'>Fitness Centers</span>": L.layerGroup(typeToMarkers.gym),
    "<span style='color: darkgreen'>Grocery Stores</span>": L.layerGroup(typeToMarkers.supermarket),
    "<span style='color: orange'>Parks</span>": L.layerGroup(typeToMarkers.park),
    "<span style='color: purple'>Restaurants</span>": L.layerGroup(typeToMarkers.restaurant),
    "<span style='color: black'>Schools</span>": L.layerGroup(typeToMarkers.school),
    "<span style='color: gray'>Transit Stations</span>": L.layerGroup(typeToMarkers.transit_station),
  };

  // Add layer control to map
  // Null to hide the baseMap
  var markerlayer = L.control.layers(null, overlayMaps)
  newLayer.remove();
  markerlayer.addTo(myMap);

});
