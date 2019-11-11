var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "docker",

    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});

//display all items
function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`
            ${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}
            ----------------------------------------------------`);
        };

        purchasePrompt();
    });
};

//function for purchase prompt
function purchasePrompt() {
    inquirer.prompt([
        {
            name: "purchaseID",
            type: "input",
            message: "What is the ID of the product you would like to purchase?",
            filter: Number
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many would you like to purchase?",
            filter: Number
        },
        {
            type: "confirm",
            message: "Will this complete your purchase?",
            name: "confirm",
            default: true
        }
    ])
    .then(function(response) {
        if (response.confirm) {
            
            console.log(`
            Item: ${response.purchaseID}
            Quantity: ${response.purchaseQuantity}
            `);
            
            var query = "SELECT * FROM products WHERE ?";

            //check that store has enough product to meet customer request
            connection.query(query, {item_id: response.purchaseID}, function(err, data) {
                if (err) throw err;

                var currentStock = data[0].stock_quantity;

                if (currentStock >= response.purchaseQuantity) {
                    console.log("Order Accepted!")
                } else {
                    console.log("Insufficient stock!")
                    purchasePrompt();
                }
            })
            
        }
    })
}

// function checkQuantity() {
//     if (response)
// }