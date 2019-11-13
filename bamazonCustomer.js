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
            message: "Is this information correct?",
            name: "confirm",
            default: true
        }
    ])
    .then(function(response) {
        if (response.confirm) {
            
            var query = "SELECT * FROM products WHERE ?";

            //check that store has enough product to meet customer request
            connection.query(query, {item_id: response.purchaseID}, function(err, data) {
                if (err) throw err;

                var currentStock = data[0].stock_quantity;
                var description = data[0].product_name;
                var department = data[0].department_name;
                var unitPrice = data[0].price;
                var productSales = data[0].product_sales;


                if (currentStock >= response.purchaseQuantity) {
                    var purchaseID = response.purchaseID;
                    
                    var updateStock = currentStock - response.purchaseQuantity;

                    updateAvailStock(updateStock, purchaseID);

                    var totalPrice = unitPrice * response.purchaseQuantity;

                    var updateSales = productSales + totalPrice;
                    
                    updateProductSales(updateSales, purchaseID);

                    // updateDepartmentSales(updateSales, department);
                    
                    console.log(`
                    Order Accepted!
                    Item ID: ${response.purchaseID}
                    Description: ${description}
                    Department: ${department}
                    Order Quantity: ${response.purchaseQuantity}
                    Order Total: $${parseFloat(totalPrice).toFixed(2)}
                    `);

                    anotherPurchase();

                } else {
                    console.log("Insufficient stock! Sorry, your order can not be placed.")
                    purchasePrompt();
                };
            }); 
        } else {
            purchasePrompt();
        };
    });
};

function updateAvailStock(updateStock, purchaseID) {
    var query = "UPDATE products SET ? WHERE ?";
    
    connection.query(query, [{stock_quantity: updateStock}, {item_id: purchaseID}], function(err) {
        if (err) throw err;
    });
};

function anotherPurchase() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to make another purchase?",
            name: "confirm",
            default: true
        }
    ]).then(function(res) {
        if (res.confirm) {
            displayProducts();
        } else {
            console.log("Thank you, please come again!");
            connection.end();
        };
    });
};

function updateProductSales(updateSales, purchaseID) {
    var query = "UPDATE products SET ? WHERE ?";
    
    connection.query(query, [{product_sales: updateSales}, {item_id: purchaseID}], function(err) {
        if (err) throw err;
    });
};

// function updateDepartmentSales(updateSales, department) {

//     var query = "UPDATE departments SET ? WHERE ?";

//     connection.query(query, [{product_sales: updateSales}, {department_name: department}], function(err) {
//         if (err) throw err;
//     });
// };