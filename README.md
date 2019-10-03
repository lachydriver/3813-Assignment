# 3813 ICT Chat Application Assignment

Welcome to my chat application assignment for 3813ICT at Griffith University.

This git repository was used throughout the development of this chat application. The main purposes of this was to keep track of my changes, and if I commit any issues, I can instantly roll back to a previous version that was working.
It also lets me keep track of each commit, and when each feature was developed and added.
This repository also allows for easy sharing with my assessor for the course.
The repository is organised with the root directory of the angular app, excluding node_modules to keep the size low, therefore ```npm install``` must be run to run the project locally.

# Testing
To run the route testing, please use ```npm test``` while the server is running.

# Data
The data structure used in the Angular application consists of both a MongoDB database and Angular's local variables stored in each component. The MongoDB is the database that stores all the information about a user, and all of the information about the groups that are within the chat application. These are both stored in separate 'collections' where each 'object' is similar to a JSON object. The users collection stores the user's username and password, their role within the chat application, and what groups and channels they are subscribed to. The groups collection stores information about the group, including its name and what channels are available inside hge group. The Angular application interacts with the MongoDB Database through routes in an Express server, which is further discussed in the rest of this document. These two collections are the main data objects in the Angular application to support user authentication, and groups that are used in the chat application itself.

# Angular Architecture
The Angular app is split into components, services, and interfaces. Each page consists of its own component, which includes data requested from the server (especially in the manage page). The service stores the functions to make the http post requests to the server to get/post data. Storing these functions in the service allows any component to access these functions, instead of making the request in the component (limiting it to the component). Finally, the routes are used to determine what component shows on the page (login page, home page, and the manage page) and to get information about messages using the sockets.io client(which gets information from the node.js server).

# Node Server
The node server is split up into mainly three files. The server.js file requires the file that stores the routes, and starts the express server that listens on a certain port. The route file exports the routes that are accessed from the Angular app. The routes file contains functions such as post and get functions for the Angular app to send and receive data from through HTTP requests. The third file contains sockets, which is used to send messages between multiple clients.The node.js server handles all requests, and performs operations on the mongoDB database when a route is posted from the Angular app, this lets the user to add users, update groups, add channels and subscribe users to channels.

# Dividing Responsibility
I have divided responsibility between the client and the server through the use of a Node server with Express which utilises MongoDB, sockets and HTTP routes. This server includes numerous routes that the Angular client can request and receive data from. This is mainly used to read and write to the MongoDB which includes information about the currently registered users, groups, and channels. The Angular client can make many requests such as adding a user, removing a group, or deleting a channel from a user. Seperating the system into these two sections means that the data can be seperated, and the Angular app can request only what data it needs at a certain time, thus reducing load times and improving performance.

# Routes

| Route | Parameters | Return Values | Purpose |
|-------|------------|---------------|---------|
|/api/login|Input Username, Input Password|User with valid parameter (true or false)|For the Angular app to request to login, where the route checks if the username exists in the Database and if the password matches.|
|/api/adduser|Username, Password Role, Email|a valid parameter of true or false|For the Angular app to request to add a user. The route checks if the already exists in the Database or not, and returns true or false depending on the input parameter.|
|/api/addgroup|Group Name|A copy of the new group|This route is used for to add a new group by supplying a group name, the server then creates a group in the database with an empty array of channels and group_assis users|
|/api/addchannel|Group Name, Channel Name|Copy of the new data|This route lets the Angular App add a channel to an existing group. It takes in a group that already exists, and a channel name string, and appends it to the end of the groups array in the database.|
|/api/getgroups|None|The groups array|This returns the groups array from the database to the angular app to store locally, and is used to populate the groups array both in the homepage and on the manage page.|
|/api/getusergroups|Username|The users groups|This is used to return the groups that a user is subscribed to, this is then assigned to an array in the Angular app.|
|/api/getalluserdata|None|The users array|This is used to get all of the users in the MongoDB database with all of their information, this is then handled throughout the dropdowns and fields on the manage user page.|
|/api/getusers|None|The list of users|This is used to return a list of all usernames that exist in the database.|
|/api/addgrouptouser|Username, Group name|Copy of the new data|This is used to subscribe a user to a new group by supplying their username and the group that they would like to subscribe to.|
|/api/deleteuser|Username|a boolean|This is used to delete a user in the database, when requested with the username from the Angular app.|
|/api/removeuserfromchannel|Username, Group name, Channel name|Copy of the data|This is used to remove a user from a channel that they are already subscribed to. The request is sent from the Angular app with the username, a group they are currently subscribed to, and the channel that they are subscribed to that they would like to not be subscribed to anymore.|
|/api/removeuserfromgroup|Username, Group name|Copy of the data|This is used to unsubscribe a user from a group that they are currently subscribed to.|
|/api/deletechannel|Group name, Channel name|Copy of the data|This is used to delete a channel. When a particular channel is deleted, it also unsubscribes any users that were subscribed to the particular channel being deleted.|
|/api/deletegroup|Group name|A boolean|This is used to delete a group within the database. It also deletes the group and all the relevant channels from any users that are subscribed to this group.|
|/api/addusertochannel|Username, Group name, Channel name|A valid boolean|This is used to subscribe a user to a channel within a group that they have already subscribed to. This request is sent from the Angular app where it determines what groups/channels they are already subscribed to.|
|/api/getgroupassis|None|A list of users assigned to each group|This is used to return the group assis admins that are assigned to each group.|


# Details of Interaction
The Angular client communicates to the server every time the page is loaded or the component is refreshed. It gets the data of all of the users, groups, and their subscribed to groups/channels every time the page refreshes. When a function is called (such as adding a user or removing a group) the component is also refreshed, which shows up on the interface instantly. This is a good method because as soon as the user presses something, the page refreshes with the new data.

Regarding sockets, the Angular application connects to the Sockets server when the homepage is loaded. When a user clicks on a group and then a channel, it communicates with the socket server and calls the 'joinRoom' function from within sockets, where they can now send and receive messages from other users. The messages for each room is pushed into an array which is displayed on the homepage when they're in a room with a forloop on the messages array.
