# bamazon-store-app
This assignment is a CLI App,like an Amazon-like storefront developed with the Node.js & MySQL The app will take in orders from customers and deplete stock from the store's inventory.this app was developed in three stages as challenges in each stage
##https://drive.google.com/file/d/1IvST5SqKsOMSjzG1WiKeIr3nlm4aMMoJ/view
##https://praisy11.github.io/bamazon-store-app/
## GIF ATTACHED
![1ivst5sqksomsjzg1wikeir3nlm4ammoj_e_download_gd_true](https://user-images.githubusercontent.com/44099789/52587965-5b214080-2e09-11e9-809d-abf04428171c.gif)

## Challenge one -Customer
![customer](https://user-images.githubusercontent.com/44099789/52587828-f8c84000-2e08-11e9-82e4-4ad8008103cd.PNG)
Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
## Challenge two -Manager
![manager](https://user-images.githubusercontent.com/44099789/52587872-1ac1c280-2e09-11e9-9441-048f8e788092.PNG)

Running this application will:
List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
## Challenge three -Supervisor
![supervisor](https://user-images.githubusercontent.com/44099789/52587903-2e6d2900-2e09-11e9-8158-3cfbe0bae160.PNG)
a new MySQL table called departments. Your table should include the following columns:
department_id
department_name
over_head_costs (A dummy number you set for each department)
Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.Make sure your app still updates the inventory listed in the products column.Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
View Product Sales by Department
Create New Department
The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

