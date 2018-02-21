//NPM Install
let inquirer = require("inquirer");
let mysql = require("mysql");
const boxen = require('boxen');
const term = require( 'terminal-kit' ).terminal;
const colors = require('colors');



// Create the connection of sql database
let connection = mysql.createConnection({
  hostname: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

//Database File
connection.connect(function(err) {
  if (err) throw err;
  //[Connection Checked]
  // console.log("connected id " + connection.threadId);
  start();
});

//CRUD Methods
const database = {
  create: function() {},

  read: function(selector = "*", place = "products") {
    //ternatary
    // selector = typeof selector !== "undefined" ? selector : "*";
    // place = typeof selector !== "undefined" ? place : "products";
    // const queryString = "SELECT" + selector + " FROM " + place;
    const queryString = `SELECT ${selector} FROM ${place}`;
    //promise will be easier
    //promise will have a value to return the function
    //database .read can be treat as a value
    return new Promise(function(resolve, reject) {
      connection.query(queryString, function(err, res) {
        if (err) {
          reject(err);
        } else if (!res) {
          console.log("No Results");
        } else {
          resolve(res);
        }
      });
    });
  },

  update: function(qty, id, column = "stock_quantity", place = "products") {
    // console.log("What is", qty, id, column, place);

    const queryString = `UPDATE ${place} SET ${column} = ${qty} WHERE item_id= ${id}`;
    return new Promise(function(resolve, reject) {
      connection.query(queryString, function(err, res) {
        if (err) reject(err);
        else if (!res) {
          console.log("No Results");
        } else {
          resolve(res);
        }
      });
    });
  },

  delete: function() {},

  // No need to delete for customer
  formatting: function() {}
  // No need to reformat the data
};

console.log(colors.yellow(boxen("\nBAMAZON \nPurchase Your Game Console", { padding: 1, align: "center" })));


//Customer File
function start() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      choices: ["Si, Por Favor!", "No, Por Favor!"],
      message: "Le Gustaría Comprar un Artículo?"
    })
    .then(function(answer) {
      if (answer.start === "Si, Por Favor!") {
        queryAllProducts();
      } else {
        console.log(colors.yellow(boxen("Siéntate", {
              align: "center",
              padding: 1,
              margin: 0,
              borderStyle: "double"
            })));
        connection.end();
      }
    });
}

function queryAllProducts(){
	connection.query("SELECT * FROM products", function(err, results) {
    console.log(colors.red("__________________________________"));
    console.log(colors.red("__________________________________"));

    console.log("\n" + "    AVAILABLE PRODUCTS FOR SALE:");
		console.log("__________________________________");
		for (var i = 0; i < results.length; i++){
			console.log(colors.cyan(boxen("\nProduct Id: " + results[i].item_id 
				+ "\nProduct Name: " + results[i].product_name 
				+ "\nDepartment Name: " + results[i].department_name
				+ "\nPrice: $" + results[i].price.toFixed(2)
				+ "\n", { padding: 0, borderStyle: "single", align: "center" })));
			console.log("__________________________________");;
		};
		setTimeout(() => {
		purchaseProductId(results);
	}, 20);
	});
};

function purchaseProductId(products){
console.log("\n");
  inquirer
    .prompt([{ name: "id", type: "list", choices: function() {
          var choiceArray = [];
          for (var i = 0; i < products.length; i++) {
            choiceArray.push(`${products[i].item_id} ${products[i].product_name}`);
          }
          return choiceArray;
        }, message: "Please choose the item you would like to purchase: " + "\n" }, { name: "quantity", type: "input", message: "How many of the item would you like to buy?" + "\n" }])
    .then(function(answer) {
      // if (err) throw err;

      if (answer.id) {
        const ans = answer.id;
        console.log(colors.blue(boxen("Thank you for purchasing your brand new " + ans.slice(2) + "\n")));
      }

      if (answer.quantity) {
        // console.log(products[parseInt(answer.id[0])])

        const currentId = answer.id.split(" ");
        const total = answer.quantity * parseFloat(products[currentId[0] - 1].price);
        console.log();
        console.log(colors.blue(boxen("Your total is $" + total)));
        // console.log("__________________________________");;
        // console.log("__________________________________");;

        var updatedQuantity = parseInt(products[parseInt(currentId[0] - 1)].stock_quantity - answer.quantity);
        // console.log(updatedQuantity);

        database.update(updatedQuantity, parseInt(currentId[0]));

        // console.log(answer.id[0]);
        console.log(colors.blue(boxen("You have finished your purchase of with a quantity of " + answer.quantity + " item(s)")));
      }
    });
};

