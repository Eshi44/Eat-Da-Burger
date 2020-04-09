// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for generating mysql syntax
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for generating mysql syntax
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

// Object for all our sql statement functions

var burgers = {
  //function to return all entries within table
  selectAll: function (tableInput, cb) {
    //returns all rows from table
    var queryString = "SELECT * FROM " + tableInput + ";";
    //executes db query
    // console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      //return results in callback
      cb(result);
    });
  },

  // function that insert a burger
  insertOne: function (table, cols, vals, cb) {
    // query string that inserts a burger row into table
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    // console.log(queryString);

    // Perform the database query
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      // return results in callback
      cb(result);
    });
  },

  // function that updates a burger
  updateOne: function (table, objColVals, condition, cb) {
    // query string that updates a burger
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    // console.log(queryString);

    // Perform the database query
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      // Return results in callback
      cb(result);
    });
  },
};

// export burgers object
module.exports = burgers;
