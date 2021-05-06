console.log("pie.js is loaded");

// Temp data for pie chart

var trace1 = {
labels: ["<18", "18 - 34", "35 - 54", "55 - 75", "75+"],
values: [10, 20, 30, 20, 20],
type: "pie",
textinfo: "label+percent",
showlegend: false
};

var data = [trace1];

var layout = {
    width: 250,
    height: 250,
    margin: {"t":25, "b":0, "l":0, "r":0}
};

Plotly.newPlot("pie-container", data, layout);