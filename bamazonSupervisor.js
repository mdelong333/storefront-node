var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("easy-table");

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
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]

    }).then(function(choice) {
        switch (choice.menu) {
            case "View Product Sales by Department":
                viewSales();
                break;

            case "Create New Department":
                createDepartment();
                break;

            case "Exit":
                connection.end();
        };
    });
};

// When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window.
// The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
function viewSales() {

    var query = "SELECT * FROM departments"

    connection.query(query, function(err) {
        if (err) throw err;
    });
};

function createDepartment() {

};