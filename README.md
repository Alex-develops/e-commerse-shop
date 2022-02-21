Project title: E-commerse shop

DESCRIPTION
This is an e-commerse online shop, done with the help of a tutorial. It allows the user to:

1) Create an account and log in as an admin.
2) Create a new product
3) Edit, update and delete a product
4) Render products page
5) 

JAVASCRIPT NODE.JS WITH EXPRESS.JS HTML CSS Javascript templates Custom created Database

HOW TO RUN THE PROJECT The project can be runned locally by downloading it and running node js in the project's folder. The user should install with npm the following dependancies: 
-express
-express-validator {check}

The server is listening to port 3000, so the user should type http://localhost:3000/ in their window to open the app.

FILES
I. Repositories folder containing: 
1) Repository parent class containg a constuctor function and its methods
2) users.js - extending repository class
First created users class, but then removed all common data to a parent class

II. Routes folder with: 
1) Admin subfolder containing: 
1.1 Auth.js - authentication route handler. 
1.2 validators.js - all validation logic when authenticating a user is moved to this file. I exported it, so it can be added to other files inside the project, i.e to auth.js. I will destructure and require it inside auth.js

III. Views folder containg: 
1) Admin subfolder with: 
1.2 helpers.js

IV. Public folder - files to be rendered by the browser
1) main.css

Files in main directory: 
1) users.json
2)index.js




