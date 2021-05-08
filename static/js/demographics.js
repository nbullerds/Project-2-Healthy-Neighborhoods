console.log("demographics.js is loaded");

function DrawDemographics(neighborhood) {
    d3.json('http://127.0.0.1:5000/neighborhoods').then(function (data) {

        console.log(`DrawDemographics(${neighborhood})`); 
        console.log("Showing all neighborhoodData:");
        console.log(data);

        var neighborhoodData = data.filter(obj => obj.Neighborhood === neighborhood); 
        
        console.log("Showing filtered neighborhoodData");
        console.log(neighborhoodData); 

            const cols = {
                "Population": ['NeighborhoodPopulation'],
                "Households ": ['NeighborhoodHouseholds'],
                "Median Income": ['MedianIncome'],
                "Unemployment (%)": ['UnemploymentPrct'],
            };

            const demographicValues = Object.keys(cols).map(() => 0); //gets array of 0s
            for (let i = 0; i < neighborhoodData.length; i++) {
                let j = 0;
                for (let key in cols) {
                    for (let k = 0; k < cols[key].length; k++) {
                        demographicValues[j] += +neighborhoodData[i][cols[key][k]];
                    }
                    j++;
                }
            }

            console.log("Showing neighborhood demographics")
            console.log(demographicValues);
            
        }); 
}

var selectedNeighborhood = "Fulton"; 
DrawDemographics(selectedNeighborhood); 