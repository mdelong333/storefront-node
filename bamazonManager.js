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
    menuOptions();
});

function menuOptions() {
    inquirer.prompt({

        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]

    }).then(function(choice) {
        switch (choice.menu) {
            case "View All Products":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLow();
                break;
            
            case "Add to Inventory":
                increaseStock();
                break;

            case "Add New Product":
                addNew();
                break;

            case "exit":
                connection.end();
                break;
        };
    });
};

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`
            ${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}
            ----------------------------------------------------`);
        };
    });
};


// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.


// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.


// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.