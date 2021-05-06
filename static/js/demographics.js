console.log("demographics.js is loaded");

function DrawDemographics(neighborhood) {
    d3.csv('../schema/Neighborhoods_data_backup.csv').then(function (data) {

        console.log(`DrawDemographics(${neighborhood})`); 

        console.log("Showing all data:");
        console.log(data);

        var neighborhoodData = data.filter(obj => obj.Neighborhood === neighborhood); 
        console.log("Showing filtered neighborhoodData");
        console.log(neighborhoodData); 

        //pie chart starts here
        const cols = {
            "0 to 17 years": ['AgeBelow18Prct'],
            "18 to 34 years ": ['Age18To34Prct'],
            "35 to 54 years": ['Age35To54Prct'],
            "55 to 74 years": ['Age55To75Prct'],
            "75 & older": ['AgeAbove75Prct'],
        };

        const pieChartValues = Object.keys(cols).map(() => 0);//gets us array of 0s
        //don't worry about it to much
        for (let i = 0; i < neighborhoodData.length; i++) {
            let j = 0;
            for (let key in cols) {
                for (let k = 0; k < cols[key].length; k++) {
                    pieChartValues[j] += +neighborhoodData[i][cols[key][k]];
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
            width: 550
            // config: {responsive: true}
        });
    }); 
}

var selectedNeighborhood = "Fulton"; 
DrawDemographics(selectedNeighborhood); 