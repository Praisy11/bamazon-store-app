# bamazon-store-app
This assignment is a CLI App,like an Amazon-like storefront developed with the Node.js & MySQL The app will take in orders from customers and deplete stock from the store's inventory.this app was developed in three stages as challenges in each stage
## Challenge one -Customer
Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
## Challenge two -Manager
Running this application will:
List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
## Challenge three -Supervisor
a new MySQL table called departments. Your table should include the following columns:
department_id
department_name
over_head_costs (A dummy number you set for each department)
Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.Make sure your app still updates the inventory listed in the products column.Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
View Product Sales by Department
Create New Department
The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

