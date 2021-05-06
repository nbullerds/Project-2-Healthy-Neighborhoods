console.log("pie.js is loaded");

function DrawPieChart(neighborhood) 
{
    d3.csv('../data/MSP_neighborhoods.csv').then(function (data) {

        console.log(`DrawPieChart(${neighborhood})`); 

        console.log("Showing all data:");
        console.log(data);

        var neighborhoodData = data.filter(obj => obj.Neighborhood === neighborhood); 
        console.log("Showing filtered neighborhoodData");
        console.log(neighborhoodData); 

        //pie chart starts here
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
DrawPieChart(selectedNeighborhood); 