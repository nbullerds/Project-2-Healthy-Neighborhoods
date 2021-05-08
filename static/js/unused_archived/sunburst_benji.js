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
        cityMap.set(currentRow.Neighborhood, {
            "Population:": +currentRow.NeighborhoodPopulation,
            "Number of Households:": +currentRow.NeighborhoodHouseholds,
            "$ Median Income:": +currentRow.MedianIncome,
            "% Unemployed:": +currentRow.UnemploymentPrct,
        });
    }
    return structureData;
}

function makeSunburstData(nicedata, mapFunc) {
    const output = [];
    for (let [cityName, neighborhoods] of nicedata) {
        const neighborhoodArray = [];
        for (let [neighborhoodName, neighborhoodData] of neighborhoods) {
            neighborhoodArray.push({
                name: neighborhoodName,
                value: mapFunc(neighborhoodData), //this is the variable
            });
        }
        output.push({
            name: cityName,
            children: neighborhoodArray,
        });
    }
    return output;
};

// var options = ["Population","Number of Households", "Median Income ($)", "Unemployment (%)"];
// console.log(options);

function drawMeASunburst(option) {
    kerry.csv('../schema/Neighborhoods_data_backup.csv', function (data) {

        console.log("Sunburst neighborhood data:");
        console.log(data);

        var nicerData = structureData(data);

        console.log("Show default of population:");
        console.log(nicerData);

        var sunburstData = makeSunburstData(nicerData, x => x[option]);

        console.log("Sunburst Population data:");
        console.log(sunburstData);

        // create a chart and set the data
        var chart = anychart.sunburst(sunburstData, "as-tree");

        // set the calculation mode
        chart.calculationMode("parent-independent");
        chart.container('sunburst');
        // style chart
        chart.width = ("100%");
        chart.height = ("100%");
        chart.draw();
    });

}


// // Households Sunburst
// function structureData(data2) {
//     const structureData = new Map();
//     for (let i = 0; i < data2.length; i++) {
//         const currentRow = data2[i];
//         //find city
//         if (!structureData.has(currentRow.City)) {
//             structureData.set(currentRow.City, new Map());
//         }
//         const cityMap = structureData.get(currentRow.City);
//         //find neighborhood
//         cityMap.set(currentRow.Neighborhood, + currentRow['NeighborhoodHouseholds']);
//     }
//     return structureData;
// }

// function makeSunburstData(nicedata2) {
//     const output = [];
//     for (let [cityName, neighborhoods] of nicedata2) {
//         const neighborhoodArray = [];
//         for (let [neighborhoodName, NeighborhoodHouseholds] of neighborhoods) {
//             neighborhoodArray.push({
//                 name: neighborhoodName,
//                 value: NeighborhoodHouseholds, //this is the variable
//             });
//         }
//         output.push({
//             name: cityName,
//             children: neighborhoodArray,
//         });
//     }
//     return output;
// };

// d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data) {

//     console.log("Show all household data:");
//     console.log(data);

//     var nicerData2 = structureData(data);

//     console.log("Show default of households:");
//     console.log(nicerData2);

//     var sunburstData2 = makeSunburstData(nicerData2);

//     console.log("Sunburst Households data:");
//     console.log(sunburstData2);

//     // create a chart and set the data
//     var chart = anychart.sunburst(sunburstData2, "as-tree");

//     // set the calculation mode
//     chart.calculationMode("parent-independent");
//     chart.container('sunburst');
//     // style chart
//     chart.width=("100%");
//     chart.height=("100%");
//     chart.draw();
//     });



// Income Sunburst
// function structureData(data3) {
//     const structureData = new Map();
//     for (let i = 0; i < data3.length; i++) {
//         const currentRow = data3[i];
//         //find city
//         if (!structureData.has(currentRow.City)) {
//             structureData.set(currentRow.City, new Map());
//         }
//         const cityMap = structureData.get(currentRow.City);
//         //find neighborhood
//         cityMap.set(currentRow.Neighborhood, + currentRow['MedianIncome']);
//     }
//     return structureData;
// }

// function makeSunburstData(nicedata3) {
//     const output = [];
//     for (let [cityName, neighborhoods] of nicedata3) {
//         const neighborhoodArray = [];
//         for (let [neighborhoodName, MedianIncome] of neighborhoods) {
//             neighborhoodArray.push({
//                 name: neighborhoodName,
//                 value: MedianIncome, //this is the variable
//             });
//         }
//         output.push({
//             name: cityName,
//             children: neighborhoodArray,
//         });
//     }
//     return output;
// };

// d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data3) {

//     console.log("Show all income data:");
//     console.log(data3);

//     var nicerData3 = structureData(data3);

//     console.log("Show default of income:");
//     console.log(nicerData3);

//     var sunburstData3 = makeSunburstData(nicerData3);

//     console.log("Sunburst income data:");
//     console.log(sunburstData3);

//     // create a chart and set the data
//     var chart = anychart.sunburst(sunburstData3, "as-tree");

//     // set the calculation mode
//     chart.calculationMode("parent-independent");
//     chart.container('sunburst');
//     // style chart
//     chart.width = ("100%");
//     chart.height = ("100%");
//     chart.draw();
// });




// // Unemployment Sunburst
// function structureData(data4) {
//     const structureData = new Map();
//     for (let i = 0; i < data4.length; i++) {
//         const currentRow = data4[i];
//         //find city
//         if (!structureData.has(currentRow.City)) {
//             structureData.set(currentRow.City, new Map());
//         }
//         const cityMap = structureData.get(currentRow.City);
//         //find neighborhood
//         cityMap.set(currentRow.Neighborhood, + currentRow['UnemploymentPrct']);
//     }
//     return structureData;
// }

// function makeSunburstData(nicedata4) {
//     const output = [];
//     for (let [cityName, neighborhoods] of nicedata4) {
//         const neighborhoodArray = [];
//         for (let [neighborhoodName, UnemploymentPrct] of neighborhoods) {
//             neighborhoodArray.push({
//                 name: neighborhoodName,
//                 value: UnemploymentPrct, //this is the variable
//             });
//         }
//         output.push({
//             name: cityName,
//             children: neighborhoodArray,
//         });
//     }
//     return output;
// };

// d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data4) {

//     console.log("Show all unemployment data:");
//     console.log(data4);

//     var nicerData4 = structureData(data4);

//     console.log("Show default of unemployment:");
//     console.log(nicerData4);

//     var sunburstData4 = makeSunburstData(nicerData4);

//     console.log("Sunburst unemployment data:");
//     console.log(sunburstData4);

//     // create a chart and set the data
//     var chart = anychart.sunburst(sunburstData4, "as-tree");

//     // set the calculation mode
//     chart.calculationMode("parent-independent");
//     chart.container('sunburst');
//     // style chart
//     chart.width=("100%");
//     chart.height=("100%");
//     chart.draw();
//     });
