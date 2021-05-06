console.log("charts.js is loaded");

function structureData(data) {
    const structureData = new Map();
    for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        //find city
        if (!structureData.has(currentRow.City)) {
            structureData.set(currentRow.City, new Map());
        }
        const cityMap = structureData.get(currentRow.City);
        //find neighborhood
        cityMap.set(currentRow.Neighborhood, +currentRow['Total population']);
    }
    return structureData;
}
function makeSunburstData(nicedata) {
    const output = [];
    for (let [cityName, neighborhoods] of nicedata) {
        const neighborhoodArray = [];
        for (let [neighborhoodName, population] of neighborhoods) {
            neighborhoodArray.push({
                name: neighborhoodName,
                value: population, //this is the variable
            });
        }
        output.push({
            name: cityName,
            children: neighborhoodArray,

            // //if statement for colors
            // if(cityName = "Minneapolis") {
            //     cityName.fill("red")
            // }  
            //     else if {
            //     cityName.fill("blue")
            //     }
             
            
        });

        
    }
    return output;
}
d3.csv('./data/MSP_neighborhoods.csv').then(function (data) {
    console.log("Logging data:");
    console.log(data);
    var nicerData = structureData(data);
    console.log("Nicer data:");
    console.log(nicerData);
    var sunburstData = makeSunburstData(nicerData);
    console.log("Sunburst data:");
    console.log(sunburstData);
    // create a chart and set the data
    var chart = anychart.sunburst(sunburstData, "as-tree");

    // set the calculation mode
    chart.calculationMode("parent-independent");
    chart.container('sunburst');
    // style chart
    chart.width=("100%");
    chart.height=("100%");
    chart.draw();
    const cols = {
        "0 to 17 years": [
            'Under 5 years',
            '5-9 years',
            '10-14 years',
            '15-17 years',
        ],
        "18 to 34 years ": [
            '18-24 years',
            '25-34 years',
        ],
        "35 to 54 years": [
            '35-44 years',
            '45-54 years',
        ],
        "55 to 74 years": [
            '55-64 years',
            '65-74 years',
        ],
        "75 & older": [
            '75-84 years',
            '85 years and older',
        ],
    };

    
    const pieChartValues = Object.keys(cols).map(() => 0);//gets us array of 0s
    //don't worry about it to much
    for (let i = 0; i < data.length; i++) {
        let j = 0;
        for (let key in cols) {
            for (let k = 0; k < cols[key].length; k++) {
                pieChartValues[j] += +data[i][cols[key][k]];
            }
            j++;
        }
    }
    //start worrying again
    console.log("plotly pie chart values");
    console.log(pieChartValues);
    Plotly.newPlot('pie', [{
        values: pieChartValues,
        labels: Object.keys(cols),
        type: 'pie',
        marker: {colors: ["#bcddf8", "#64b5f6", "#1976d2", "#0a529a", "#032f5a"]},
    }], {
        height: 450,
        width: 500
        // config: {responsive: true}
    });
});