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
                updateStock();
                break;

            case "Add New Product":
                addNew();
                break;

            case "Exit":
                connection.end();
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

        menuOptions();
    });
};

// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function viewLow() {

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`
            ${res[i].item_id} | ${res[i].product_name} | ${res[i].stock_quantity}
            ---------------------------------------`);
        };

        menuOptions();
    });
};

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function updateStock() {
    
    inquirer.prompt([
        {
            name: "itemID",
            message: "Enter the ID of the product you'd like to update:",
            type: "input",
            filter: Number
        },
        {
            name: "newQuantity",
            message: "Enter new inventory quantity:",
            type: "input",
            filter: Number
        }
    ])
    .then(function(res) {
        var query = "UPDATE products SET ? WHERE ?";
    
        connection.query(query, [{stock_quantity: res.newQuantity}, {item_id: res.itemID}], function(err) {
            if (err) throw err;
        });
        
        console.log(`
        Product number ${res.itemID} updated to ${res.newQuantity}
        ---------------------------------------\n`);

        updateMoreStock();
    });
};

function updateMoreStock() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to update inventory quantity for another item?",
            name: "confirm",
            default: true
        }
    ]).then(function(res) {
        if (res.confirm) {
            updateStock();
        } else {
            menuOptions();
        };
    });
};

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addNew() {

    inquirer.prompt([
        {
            name: "productName",
            message: "Enter new product name:",
            type: "input",
        },
        {
            name: "departmentName",
            message: "Enter product department:",
            type: "input",
        },
        {
            name: "price",
            message: "Enter price per unit:",
            type: "input",
            filter: Number
        },
        {
            name: "stockQuantity",
            message: "Enter new product stock quantity:",
            type: "input",
            filter: Number
        }
    ])
    .then(function(res) {

        connection.query("INSERT INTO products SET ?", 
        {
            product_name: res.productName,
            department_name: res.departmentName,
            price: res.price,
            stock_quantity: res.stockQuantity
        }, 
        function(err) {
            if (err) throw err
        });

        console.log(`
        New item added! 
        Product: ${res.productName}
        Department: ${res.departmentName}
        Price: ${res.price}
        Quantity: ${res.stockQuantity}
        ---------------------------------------\n`);

        addAnother();
    });
};

function addAnother() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another item?",
            name: "confirm",
            default: true
        }
    ]).then(function(res) {
        if (res.confirm) {
            addNew();
        } else {
            menuOptions();
        };
    });
};