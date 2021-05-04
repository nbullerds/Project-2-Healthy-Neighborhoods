-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Neighborhoods" (
    "NeighborhoodID"  SERIAL  NOT NULL,
    "Neighborhood" string   NOT NULL,
    "City" string   NOT NULL,
    "NeighborhoodPopulation" int   NOT NULL,
    "NeighborhoodHouseholds" int   NOT NULL,
    "MedianIncome" int   NOT NULL,
    "PublicTransportPrct" float   NOT NULL,
    "WalkBiketoWorkPrct" float   NOT NULL,
    "UnemploymentPrct" float   NOT NULL,
    "AgeBelow18Prct" float   NOT NULL,
    "Age18To34Prct" float   NOT NULL,
    "Age35To54Prct" float   NOT NULL,
    "Age55To75Prct" float   NOT NULL,
    "AgeAbove75Prct" float   NOT NULL
);

CREATE TABLE "Places" (
    "placeID"  SERIAL  NOT NULL,
    "placeName" string   NOT NULL,
    "placeType" string   NOT NULL,
    "placeLat" float   NOT NULL,
    "placeLng" float   NOT NULL
);

