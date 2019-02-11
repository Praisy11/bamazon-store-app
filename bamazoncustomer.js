var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var Color = require('color');
//var totalCost;
//var bQtyStock;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Praisy11",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  listAllItems();
  
});
/* list all items in store*/
function listAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    var table = new Table({
      head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity','Product Sale']
  });
      console.log('*********************Welcome to Bamazon Store*************');
      console.log('**********************************************************');
      console.log('****************All of the items available for sale*******');
      console.log('**********************************************************');
      for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id , res[i].product_name , res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity,res[i].prodSale.toFixed(2)]);
    }
    console.log("*********************************************************************");
    console.log(table.toString());
    start();
  });
}

/* prompt users with two messages*/
function start() {
      inquirer.prompt({
        name: "itemId",
        type: "input",
        message: "Please enter the item_id of the product you would like to buy? ",
        
      }).then(function(ans1){
      var input1= ans1.itemId;
      connection.query("SELECT * FROM products WHERE item_id =?",input1, function(err, res) {  
      if (err) throw err; 
      if (res.length===0){
        console.log("The item Id you chose does not exist, kindly chose a correct item_id from the List");
      }

      else

      inquirer.prompt({
        name: "stockQ",
        type: "input",
        message: "How many units of this product would you like to buy? ",
        
      }).then(function(ans2){
        var input2= ans2.stockQ;
        if(input2 > res[0].stock_quantity){
        console.log("We are sorry your order for".yellow + res[0].product_name + " has been cancelled due to insufficient stock.".yellow);
      }
      else{
        var totalCost = (input2 * res[0].price.toFixed(2));
        console.log(res[0].product_name + ' purchased')
        console.log(input2 + ' units = $' + res[0].price.toFixed(2));
        console.log( 'You total for this purchase is : '+ '$' + totalCost)
      }
      var updateStock=res[0].stock_quantity -input2;
      console.log("Current prodSale : "+ res[0].prodSale.toFixed(2));
      var TprodSale = parseInt (totalCost) + parseInt(res[0].prodSale.toFixed(2)); 
      console.log("Tprodsale :"+TprodSale);
      connection.query("UPDATE products SET stock_quantity =" + updateStock + ", prodSale=" + TprodSale + " WHERE item_id =" + res[0].item_id, function(err, res){
        if (err) throw err;
       
              console.log('*************************************************************');
              console.log('Your Order has been Processed');
              console.log('Thank you for Shopping with Bamazon...!.');
              console.log('*************************************************************');
              connection.end();
            });
      })
  
    })
  })
} 

  

