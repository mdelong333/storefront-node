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
    purchasePrompt();
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
    });
};

function purchasePrompt() {
    inquirer.prompt([
        {
            name: "purchaseID",
            type: "input",
            message: "What is the ID of the product you would like to purchase?"
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many would you like to purchase?"
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
            //check that store has enough product to meet customer request
            console.log(`
            Item: ${response.purchaseID}
            Quantity: ${response.purchaseQuantity}
            `)
            
        }
    })
}

// function checkQuantity() {
//     if (response)
// }