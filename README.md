# Bamazon Storefront

## Description

Bamazon is an Amazon-like storefront. It is a CLI node app using MySQL database to store and retrieve product and department info.

## Video Link

[bamazon video](https://youtu.be/7WJdSSNTIqc)

## Installation
1. Open CLI and clone repo 
* `git clone git@github.com:mdelong333/storefront-node.git`
2. Run `npm install` to install package dependencies

## NPM packages

* `inquirer`
* `mysql`
* `easy-table`

## Customer.js

`node bamazonCustomer.js` 

Allows user to select product and quantity to purchase, displays completed order info, updates total sales and inventory when an order is completed.

## Manager.js

`node bamazonManager.js`

Allows manager to view all products in inventory, view low inventory, increase inventory quantities, and add new products to inventory.
