-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/QD7BtL
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Neighborhoods" (
    "NeighborhoodID"  SERIAL  NOT NULL,
    "Neighborhood" varchar(50)   NOT NULL,
    "City" varchar(50)   NOT NULL,
    "NeighborhoodPopulation" int   NOT NULL,
    "NeighborhoodHouseholds" int   NOT NULL,
    "AverageIncome" int   NOT NULL,
    "PublicTransportPrct" float   NOT NULL,
    "WalkBiketoWorkPrct" float   NOT NULL,
    "UnemploymentPrct" float   NOT NULL,
    "AgeBelow18Prct" float   NOT NULL,
    "Age18To34Prct" float   NOT NULL,
    "Age35To54Prct" float   NOT NULL,
    "Age55To75Prct" float   NOT NULL,
    "AgeAbove75Prct" float   NOT NULL,
    CONSTRAINT "pk_Neighborhoods" PRIMARY KEY (
        "NeighborhoodID"
     )
);

CREATE TABLE "Places" (
    "PlaceID"  SERIAL  NOT NULL,
    "PlaceName" varchar(50)   NOT NULL,
    "PlaceType" varchar(50)   NOT NULL,
    "PlaceLat" float   NOT NULL,
    "PlaceLng" float   NOT NULL,
    CONSTRAINT "pk_Places" PRIMARY KEY (
        "PlaceID"
     )
);

