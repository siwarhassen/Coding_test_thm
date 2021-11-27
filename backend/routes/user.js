const express = require("express");
const userrouter = express.Router();
const userController = require("../controllers/user");
//parser allow us to upload photo in cloudinary,check api/cloudinary.js to understand more
const parser=require('../api/cloudinary');

//Cors allows us to relax the security applied to an API.
var cors = require('cors');


/** Retrieve a single User with id */
//use http://localhost:3002/user/getuserbyId/:id 
userrouter.get("/getuserbyId/:id",cors(), userController.findUserById);

/** Update a user with id */
//use http://localhost:3002/user/updateUser/:id  you must use formData
userrouter.put("/updateUser/:id",cors(),parser.single('photo'), userController.updateUser);

module.exports = userrouter;