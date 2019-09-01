# 3813 ICT Chat Application Assignment

Welcome to my chat application assignment for 3813ICT at Griffith University.

This git repository was used throughout the development of this chat application. The main purposes of this was to keep track of my changes, and if I commit any issues, I can instantly roll back to a previous version that was working.
It also lets me keep track of each commit, and when each feature was developed and added.
This repository also allows for easy sharing with my assessor for the course.
The repository is organised with the root directory of the angular app, excluding node_modules to keep the size low, therefore ```npm install``` must be run to run the project locally.

# Data
The data that both the server and angular app use varies with data types. The server side stores all of the information in a single JSON file. This json object includes both the user object and the groups. The JSON file is read by each route when required, and information is stored within the route using an array or an object. This is then appended to the copy of the JSON file within the route, and then the copy of the data (with the new data) back to the JSON file using the save function.

The angular app uses many variables, to store the currently chosen user, group, or channel. There are also array's that are used to populate the dropdown menu's (returned from the server upon the component loading).

# Angular Architecture
The Angular app is split into components, services, and interfaces. Each page consists of its own component, which includes data requested from the server (especially in the manage page). The service stores the functions to make the http post requests to the server to get/post data. Storing these functions in the service allows any component to access these functions, instead of making the request in the component (limiting it to the component). Finally, the routes are used to determine what component shows on the page (login page, home page, and the manage page).

# Node Server
The node server is split up into mainly two files. The server.js file requires the file that stores the routes, and starts the express server that listens on a certain port. The route file exports the routes that are accessed from the Angular app. The routes file contains functions such as post and get functions for the Angular app to send and receive data from through HTTP requests.

# DIVIDING RESPONSIBILITIES

# LIST OF ROUTES

# Details of Interaction
