//Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

// burger object
var burger = {
    // grab all burgers 
    selectAll: function(cb) {
      orm.selectAll('burgers', function(res) {
        cb(res);
      });
    },
  
    // grab variables cols and vals 
    insertOne: function(cols, vals, cb) {
      orm.insertOne('burgers', cols, vals, function(res) {
        cb(res);
      });
    },
  
    //  objColVals is an object specifying columns as object keys with respective values
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne('burgers', objColVals, condition, function(res) {
        cb(res);
      });
    }
  };
  
  // export the database functions for the controller (burgerController.js).
  module.exports = burger;
