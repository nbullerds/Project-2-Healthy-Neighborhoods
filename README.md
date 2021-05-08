# Project-2-Healthy-Neighborhoods


This dashboard demonstrates how to integrate Flask with HTML and JavaScript code. This project will note run on LiveServer, a Flask server must be used.

![dashboard](static/img/dashboard.png)

---

## Directions
Please clone this repository and then do the following:

1. Peruse the files and the project directory structure in the cloned directory to get familier with the project methodology. Note the use of the ``templates`` and ``static`` folders. 
1. In the ``Project-2-Healthy-Neighborhoods/static/js/`` folder, create a file called ``config.js``  
2. Go to https://www.mapbox.com/ and sign up for an API key. Copy that API key and place in in the ``config.js`` file in a variable called ``const API_KEY = "PUT YOUR KEY HERE";`` and save the file.
3. In the  ``Project-2-Healthy-Neighborhoods`` folder, create a file called ``config.py``.
4. Assign your pgAdmin username to a variable called username, like so: ``username = [pgAdmin username]``.
5. Assign your pgAdmin password to a variable called password, like so: ``password = [pgAdmin password]``.
6. Assign your gkey (google API key to a variable called gkey, like so: ``gkey = [google places API key]``, then save ``config.py``.  If you don't have a google API key, see information here on how to get one https://developers.google.com/maps/documentation/places/web-service/get-api-key
7. In pgAdmin, create a new database called ``MSP_Neighborhoods``.
8. In the ``MSP_Neighborhoods`` database, run ``NeighborhoodsTableSchema.sql``, found in the `\schema\` folder, to generate tables for storing Neighborhood and Places data.
9. Open  ``Project 2 ETL notebook.ipynb`` in Jupyter Notebook
10. Run all the cells. This will store all data needed for the site within the ``MSP_Neighborhoods`` database.  This may take a few minutes to complete. 
11. Run ``python app.py`` to launch a flask server connected to the ``MSP_Neighborhoods`` database.
12. Observe that the Flask server starts and tells you which port it's running on. Don't close this window.
13. With the Flask server running, enter this address in your Chrome browser: http://127.0.0.1:5000/. You'll see that it loads the index page, allowing you to navigate the website with the data from ``MSP_Neighborhoods``.

## Project Team
* Nick Buller
* Kerry Harp
* Sofanit Mengesha
