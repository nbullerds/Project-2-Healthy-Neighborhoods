console.log("sunburst.js is loaded");

// Population Sunburst
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
        cityMap.set(currentRow.Neighborhood, + currentRow['NeighborhoodPopulation']);
    }
    return structureData;
}
function makeSunburstData(nicedata) {
    const output = [];
    for (let [cityName, neighborhoods] of nicedata) {
        const neighborhoodArray = [];
        for (let [neighborhoodName, NeighborhoodPopulation] of neighborhoods) {
            neighborhoodArray.push({
                name: neighborhoodName,
                value: NeighborhoodPopulation, //this is the variable
            });
        }
        output.push({
            name: cityName,
            children: neighborhoodArray,
        });
    }
    return output;
};

d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data) {
    
    console.log("Show all neighborhood data:");
    console.log(data);
    
    var nicerData = structureData(data);
    console.log("Show default of population:");
    console.log(nicerData);
    
    var sunburstData = makeSunburstData(nicerData);
    console.log("Sunburst Population data:");
    console.log(sunburstData);
    
    // create a chart and set the data
    var chart = anychart.sunburst(sunburstData, "as-tree");
    
    // set the calculation mode
    chart.calculationMode("parent-independent");
    chart.container('s1');
   
    // style chart
    chart.width = ("100%");
    chart.height = ("100%");
    chart.draw();
});



// Households Sunburst
function structureData2(data) {
    const structureData2 = new Map();
    for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        //find city
        if (!structureData2.has(currentRow.City)) {
            structureData2.set(currentRow.City, new Map());
        }
        const cityMap = structureData2.get(currentRow.City);
        //find neighborhood
        cityMap.set(currentRow.Neighborhood, + currentRow['NeighborhoodHouseholds']);
    }
    return structureData2;
}

function makeSunburstData(nicedata) {
    const output = [];
    for (let [cityName, neighborhoods] of nicedata) {
        const neighborhoodArray = [];
        for (let [neighborhoodName, NeighborhoodHouseholds] of neighborhoods) {
            neighborhoodArray.push({
                name: neighborhoodName,
                value: NeighborhoodHouseholds, //this is the variable
            });
        }
        output.push({
            name: cityName,
            children: neighborhoodArray,
        });
    }
    return output;
};

d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data) {

    console.log("Show all household data:");
    console.log(data);

    var nicerdata = structureData2(data);

    console.log("Show default of households:");
    console.log(nicerdata);

    var sunburstdata = makeSunburstData(nicerdata);

    console.log("Sunburst Households data:");
    console.log(sunburstdata);

    // create a chart and set the data
    var chart = anychart.sunburst(sunburstdata, "as-tree");

    // set the calculation mode
    chart.calculationMode("parent-independent");
    chart.container('s2');
    // style chart
    chart.width = ("100%");
    chart.height = ("100%");
    chart.draw();
});



// Income Sunburst
function structureData3(data) {
    const structureData3 = new Map();
    for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        //find city
        if (!structureData3.has(currentRow.City)) {
            structureData3.set(currentRow.City, new Map());
        }
        const cityMap = structureData3.get(currentRow.City);
        //find neighborhood
        cityMap.set(currentRow.Neighborhood, + currentRow['MedianIncome']);
    }
    return structureData3;
}

function makeSunburstData(nicedata) {
    const output = [];
    for (let [cityName, neighborhoods] of nicedata) {
        const neighborhoodArray = [];
        for (let [neighborhoodName, MedianIncome] of neighborhoods) {
            neighborhoodArray.push({
                name: neighborhoodName,
                value: MedianIncome, //this is the variable
            });
        }
        output.push({
            name: cityName,
            children: neighborhoodArray,
        });
    }
    return output;
};

d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data) {

    console.log("Show all income data:");
    console.log(data);

    var nicerdata = structureData3(data);

    console.log("Show default of income:");
    console.log(nicerdata);

    var sunburstdata = makeSunburstData(nicerdata);

    console.log("Sunburst income data:");
    console.log(sunburstdata);

    // create a chart and set the data
    var chart = anychart.sunburst(sunburstdata, "as-tree");

    // set the calculation mode
    chart.calculationMode("parent-independent");
    chart.container('s3');
    // style chart
    chart.width = ("100%");
    chart.height = ("100%");
    chart.draw();
});




// Unemployment Sunburst
function structureData4(data) {
    const structureData4 = new Map();
    for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        //find city
        if (!structureData4.has(currentRow.City)) {
            structureData4.set(currentRow.City, new Map());
        }
        const cityMap = structureData4.get(currentRow.City);
        //find neighborhood
        cityMap.set(currentRow.Neighborhood, + currentRow['UnemploymentPrct']);
    }
    return structureData4;
}

function makeSunburstData(nicedata) {
    const output = [];
    for (let [cityName, neighborhoods] of nicedata) {
        const neighborhoodArray = [];
        for (let [neighborhoodName, UnemploymentPrct] of neighborhoods) {
            neighborhoodArray.push({
                name: neighborhoodName,
                value: UnemploymentPrct, //this is the variable
            });
        }
        output.push({
            name: cityName,
            children: neighborhoodArray,
        });
    }
    return output;
};

d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data) {

    console.log("Show all unemployment data:");
    console.log(data);

    var nicerdata = structureData4(data);

    console.log("Show default of unemployment:");
    console.log(nicerdata);

    var sunburstdata = makeSunburstData(nicerdata);

    console.log("Sunburst unemployment data:");
    console.log(sunburstdata);

    // create a chart and set the data
    var chart = anychart.sunburst(sunburstdata, "as-tree");

    // set the calculation mode
    chart.calculationMode("parent-independent");
    chart.container('s4');
    // style chart
    chart.width = ("100%");
    chart.height = ("100%");
    chart.draw();
});
