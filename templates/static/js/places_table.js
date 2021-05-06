console.log("places table loaded");

var places = "schema/Places_data_backup.csv";
var neighborhoods = "schema/Neighborhoods_data_backup.csv";
var walkscore = "data/MSP_neighborhoods_walkability_address.csv";

var tableData = data;

var tbody = d3.select("tbody");

d3.csv("../schema/Places_data_backup.csv").then(function(data) {
    console.log(data);
});

data.forEach((place) => {
    var row = tbody.append("tr");
    Object.entries(ufo).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
    console.log(place);
});