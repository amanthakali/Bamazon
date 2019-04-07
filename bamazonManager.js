var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  initialPrompt();
});

// function which prompts the user for what action they should take
function initialPrompt() {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "Welcome Manager!!",

      choices: [
        "View Product",
        "View Low Inventory",
        "Add New Product",
        "Add Inventory"
      ]
    })
    .then(function(answer) {
      // based on their answer, either call the buy or view inventory functions
      if (answer.mainMenu === "View Product") {
        viewProduct();
      } else if (answer.mainMenu === "View Low Inventory") {
        viewLowInventory();
      } else if (answer.mainMenu === "Add New Product") {
        addNewProduct();
      } else if (answer.mainMenu === "Add Inventory") {
        addInventory();
      } else {
        connection.end();
      }
    });
}

function viewProduct() {
  var queryStr = "SELECT * FROM product";
  connection.query(queryStr, function(err, data) {
    //console.log(data);
    if (err) throw err;
    var strOut = "";
    for (var i = 0; i < data.length; i++) {
      strOut = "";
      strOut += "Item ID: " + data[i].item_id + "  //  ";
      strOut += "Product Name: " + data[i].product_name + "  //  ";
      strOut += "Department: " + data[i].department_name + "  //  ";
      strOut += "Price: $" + data[i].Price + "  //  ";
      strOut += "Quantity: " + data[i].stockQuantity + "\n";
      console.log(strOut);
    }
  });
}

function viewLowInventory() {
  var queryStr = "SELECT * FROM product WHERE stockQuantity < 20";
  connection.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log("Low Inventory Items (below 20): ");
    console.log("................................\n");

    //console.log(data)
    var strOut = "";
    for (var i = 0; i < data.length; i++) {
      strOut = "";
      strOut += "Item ID: " + data[i].item_id + "  //  ";
      strOut += "Product Name: " + data[i].product_name + "  //  ";
      strOut += "Department: " + data[i].department_name + "  //  ";
      strOut += "Price: $" + data[i].Price + "  //  ";
      strOut += "Quantity: " + data[i].stockQuantity + "\n";
      console.log(strOut);
    }
    console.log(
      "---------------------------------------------------------------------\n"
    );
    // End the database connection
    connection.end();
  });
}

// validateInteger makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);
  if (integer && sign === 1) {
    return true;
  } else {
    return "Please enter a whole non-zero number.";
  }
}
// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
  // Value must be a positive number
  var number = typeof parseFloat(value) === "number";
  var positive = parseFloat(value) > 0;
  if (number && positive) {
    return true;
  } else {
    return "Please enter a positive number for the unit price.";
  }
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "product_name",
        message: "Please enter the new product name."
      },
      {
        type: "input",
        name: "department_name",
        message: "Which department does the new product belong to?"
      },
      {
        type: "input",
        name: "Price",
        message: "What is the price per unit?",
        validate: validateNumeric
      },
      {
        type: "input",
        name: "stockQuantity",
        message: "How many items are in stock?",
        validate: validateInteger
      }
    ])
    .then(function(input) {
      // console.log('input: ' + JSON.stringify(input));

      console.log(
        "Adding New Item: \n    product_name = " +
          input.product_name +
          "\n" +
          "    department_name = " +
          input.department_name +
          "\n" +
          "    price = " +
          input.Price +
          "\n" +
          "    stock_quantity = " +
          input.stockQuantity
      );

      // Create the insertion query string
      var queryStr = "INSERT INTO product SET ?";

      // Add new product to the db
      connection.query(queryStr, input, function(error, results, fields) {
        if (error) throw error;

        console.log(
          "New product has been added to the inventory under Item ID " +
            results.insertId +
            "."
        );
        console.log(
          "\n---------------------------------------------------------------------\n"
        );

        // End the database connection
        connection.end();
      });
    });
}

function addInventory() {}
