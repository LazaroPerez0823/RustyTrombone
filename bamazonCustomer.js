var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    ListItems();
});

function ListItems() {

    connection.query("SELECT * FROM Products", function (err, res) {
        console.log(res);
        if (err) throw err;
        console.log("\n" + "Thank you for coming to Bamazon for all your shopping needs" + "\n\n" + "Current Inventory" + "\n")
        res.forEach(stuff => {
            console.log("Item ID: " + stuff.item_id + " | " + "Product Name: " + stuff.product_name + " | " + "Department Name: " + stuff.department_name + " | " + "Price: " + stuff.price);
                })
                console.log("\n")

            PromptAction();
    })
};

function PromptAction() {
    inquirer.prompt([
        {
        name: "pickItem",
        type: "number",
        message: "What is the ID of the Product you would like to purchase?"
      },

      {
        name: "howMany",
        type: "number",
        message: "How many would you like to purchase?"
      }])
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       if (err) throw err;
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }



















  