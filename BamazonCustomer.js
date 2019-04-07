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
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "product",
      type: "list",
      message: "Welcome to BAMAZON!!!!!!",

      choices: ["Buy", "Inventory", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the buy or view inventory functions
      if (answer.product === "Buy") {
        buy();
      } else if (answer.product === "Inventory") {
        displayInventory();
      } else {
        connection.end();
      }
    });
}
function buy() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Enter the id of the item you want to buy"
      },

      {
        name: "quantity",
        type: "input",
        message: "Enter the quantity you want to buy",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var item = answer.item_id;
      var quantity = answer.quantity;

      // Query db to confirm that the given item ID exists in the desired quantity
      var queryStr = "SELECT * FROM product  WHERE ?";

      //console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

      // when finished prompting, insert a new item into the db with that info
      connection.query(
        queryStr,
        {
          item_id: item
        },
        function(err, data) {
          //console.log(data);
          if (err) throw err;

          if (data.length === 0) {
            console.log(
              "ERROR: Invalid Item ID. Please select a valid Item ID."
            );
            displayInventory();
          } else {
            var productData = data[0];

            // console.log('productData = ' + JSON.stringify(productData));
            console.log(
              "Stock of the item " +
                "(" +
                productData.product_name +
                ")" +
                "=" +
                productData.stockQuantity
            );

            // If the quantity requested by the user is in stock
            if (quantity <= productData.stockQuantity) {
              console.log(
                "Congratulations, the product you requested is in stock! Placing order!"
              );

              // Construct the updating query string
              var updateQueryStr =
                "UPDATE product SET stockQuantity = " +
                (productData.stockQuantity - quantity) +
                " WHERE item_id = " +
                item;
              // console.log('updateQueryStr = ' + updateQueryStr);

              // Update the inventory
              connection.query(updateQueryStr, function(err, data) {
                if (err) throw err;

                console.log(
                  "Your oder has been placed! Your total is $" +
                    productData.Price * quantity
                );
                console.log("Thank you for shopping with us!");
                console.log(
                  "\n---------------------------------------------------------------------\n"
                );

                // End the database connection
                connection.end();
              });
            } else {
              console.log(
                "Sorry, there is not enough product in stock, your order can not be placed as is."
              );
              console.log("Please modify your order.");
              console.log(
                "\n---------------------------------------------------------------------\n"
              );

              displayInventory();
            }
          }
        }
      );
    });
}

function displayInventory() {
  // console.log('___ENTER displayInventory___');

  // Construct the db query string
  queryStr = "SELECT * FROM product";

  // Make the db query
  connection.query(queryStr, function(err, data) {
    if (err) throw err;

    console.log("Details of the products, price and stock quantity ");
    console.log("...................\n");

    var strOut = "";
    for (var i = 0; i < data.length; i++) {
      strOut = "";
      strOut += "Item ID: " + data[i].item_id + "  //  ";
      strOut += "Product Name: " + data[i].product_name + "  //  ";
      strOut += "Department: " + data[i].department_name + "  //  ";
      strOut += "Stock left: " + data[i].stockQuantity + "  //  ";

      strOut += "Price: $" + data[i].Price + "\n";

      console.log(strOut);
    }

    console.log(
      "---------------------------------------------------------------------\n"
    );

    //Prompt the user to home page.
    start();
  });
}
