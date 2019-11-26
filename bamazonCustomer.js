var mysql = require("mysql");
var inquirer = require("inquirer");
var spacer = "\n" + "*-------------------------------------------------------------------------------------------------------------------------------------*" + "\n"

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

function runAgain() {

    inquirer.prompt([
    {        
    type: "list",
    name: "again",
    message: "Do you wish to purchase something else?",
    choices: ["YES", "NO"]
    }
]).then(function (answer) {
        if (answer.again == "YES") {
        listItems();
        }
        
        else {
        connection.end();
        }
    })

};


function listItems() {

    connection.query("SELECT * FROM Products", function (err, res) {
        if (err) throw err;
        console.log(spacer + "Thank you for coming to Bamazon for all your shopping needs" + "\n\n" + "Current Inventory")
        res.forEach(stuff => {
            console.log("Item ID: " + stuff.item_id + " | " + "Product Name: " + stuff.product_name + " | " + "Department Name: " + stuff.department_name + " | " + "Price: " + stuff.price);
        })
        console.log(spacer)

        promptAction();
    })
};

function promptAction() {
    inquirer.prompt([{
                name: "pickItem",
                type: "number",
                message: "What is the ID of the Product you would like to purchase?"
            },

            {
                name: "howMany",
                type: "number",
                message: "How many would you like to purchase?"
            }
        ])

        .then(function (answer) {
            var query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";
            connection.query(query, {
                    item_id: answer.pickItem
                },
                (err, results) => {

                    if (results.length === 0) {
                        console.log(spacer + "Product ID NOT found. Going back to item selection" + spacer);

                    runAgain();

                    } else if (answer.howMany <= results[0].stock_quantity) {
                        var total = answer.howMany * results[0].price;
                        var query = connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: results[0].stock_quantity - answer.howMany
                            },
                            {
                                item_id: answer.pickItem
                            }
                        ], (err, res) => {
                            if (err) throw err;
                            console.log(spacer + "Transaction was successful. Total cost: " + total);
                            runAgain();
                        });

                    } else {
                        console.log(spacer + "There's only " + results[0].stock_quantity + " available. Our supply doesn't meet your demand. \n Please select a quantity equal to or lower than our current stock\n" + spacer);
                       runAgain();
                    }
                });
        });
};

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listItems();
})