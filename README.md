# API RESTful for Veg App

This node.js app allows you to get, create, update and delete products, users and orders.

You can perform CRUD operation with the following endpoints: /products, /users, /orders.
You can add a params :id to get, create, delete and update a single item.

Also you can filter orders based on the date and product name using "productName" or "date" variable querystring with the format "YYYY-MM-DD"

## Built with

* Node.js
* Express
* MongoDB
* Mongoose
* Dotenv
* Nodemon
* email-validator
* Jest
* Supertest

## Installation

```sh 
git clone https://github.com/michaeldidonato/node_api_project.git
```

   ### `npm i`

   Create a file .env to set 
   ```sh 
   DATABASE_URL=mongodb+srv://{user}:{password}@vegapp.vald4sq.mongodb.net/?retryWrites=true&w=majority
```
 ## Available Scripts

  ### `npm start`

   Runs the app in the development mode. Open localhost:3000 and test endpoints.


### `npm test`

   To test this app set in __test__ file ids referred for each entity and comment code in server.js file from line 32 to 34



