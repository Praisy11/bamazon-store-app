var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var Color = require('color');
var totalCost;

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
    runSearch();
  });
  /* refered to Top5000 class activity*/
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",         
            "Add to Inventory",
           "Add New Product",
           "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          prodSaleView();
          break;
  
        case "View Low Inventory":
          lowInvenView();
          break;
  
        case "Add to Inventory":
          invenAdd();
          break;
  
        case "Add New Product":
           prodAdd();
           break;

           case "Exit":
           exit();
           break;
        }
      });
  }
  /*If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.*/
  function prodSaleView() {
    connection.query("SELECT * FROM products", function(err, res) {
      var table = new Table({
        head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    });
        
        console.log('**********************************************************');
        console.log('***********View all of the items available for sale*******');
        console.log('**********************************************************');
        for (var i = 0; i < res.length ; i++) {
        table.push([res[i].item_id , res[i].product_name , res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
      }
      console.log("*********************************************************************");
      console.log(table.toString());
      runSearch();
    });
  }
  /*If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.*/
  function lowInvenView() {
    connection.query("SELECT * FROM products", function(err, res) {
      var table = new Table({
        head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    });
        
        console.log('**********************************************************');
        console.log('**************** View of all Low Inventory Items *********');
        console.log('**********************************************************');
        for (var i = 0; i < res.length; i++) {
            if(res[i].stock_quantity <= 50 ){
        table.push([res[i].item_id , res[i].product_name , res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
      }
    }
      console.log("*********************************************************************");
      console.log(table.toString());
      runSearch();
    });
  }
/*If a manager selects Add to Inventory, your app should display a prompt
 that will let the manager "add more" of any item currently in the store.*/
 function invenAdd() {
    connection.query("SELECT * FROM products", function(err, res) {
      var table = new Table({
        head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    });
        console.log('***************************************************************************');
        console.log('**************** Add items to Inventory for Existing products**************');
        console.log('***************************************************************************');
        inquirer.prompt([
            {
                name: "itemId",
                type: "input",
                message: "Enter item Id of the product that you would like to add to inventory."
            },
            {
                name: "stockQ",
                type: "input",
                message: "How much quantity would you like to add to stock?"
            }
        ]).then(function(answer) {

        var itemChosen;
        for (var i=0; i<res.length; i++){
            if(res[i].item_id === parseInt(answer.itemId)){
                itemChosen=res[i];
            }
        }
        var updateQty = parseInt(itemChosen.stock_quantity)+ parseInt(answer.stockQ);
        console.log("Updated Inventory for " + itemChosen.product_name+ " with quantity "+updateQty);
      //  console.log("item id :" + answer.itemId);
        connection.query("UPDATE products SET stock_quantity =" + updateQty + " WHERE item_id =" + answer.itemId,function(err, res){
            if (err) throw err;
           
                  
                  console.log("Updated Inventory :" + updateQty);
                  console.log('*************************************************************');
                  console.log(table.toString());
                  connection.end();
                });
           
            
       
      
      
      runSearch();
      //prodSaleView() ;
      

        }
        )}

    )}




/*If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.*/
    function prodAdd() {
        //console.log("praisy");
       
        console.log('***********************************************************');
              console.log('**************** Add New Product to stock ******************');
              console.log('***********************************************************');

        /*connection.query(" SELECT * FROM products", function(err, res) {
            var table = new Table({
              head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
          });
              
              
              for (var i = 0; i < res.length; i++) {
              table.push([res[i].item_id , res[i].product_name , res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
            }
            console.log("***************************************************************");
            console.log(table.toString());
           
            
            });*/
        inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the name of the product to add to inventory."
        },
        {
            name: "cost",
            type: "input",
            message: "Enter the price of the product per unit to add to inventory.."
        },
        {
            name: "dept",
            type: "input",
            message: "Enter the department name of the product to add to inventory.."
        },
        {
            name: "stock",
            type: "input",
            message: "Enter the number of stock for the product to add to inventory.."
        }, ])
        .then(function(input){
            var Nname = input.name;
            var Ncost = parseInt(input.cost);
            var Ndept = input.dept;
            var Nstock = parseInt(input.stock);
            //INSERT INTO tbl_name () VALUES();//
           /* connection.query("INSERT into Products(product_name,price,department_name,stock_quantity) VALUES (?,0.00,?,?)",
            [
                Nname, Ncost, Ndept, Nstock            
            ],*/
          
            var Nprodsale=0;
          /*  var NdeptId ="";
            connection.query("SELECT * from departments", function(err,res) {
                if (err) throw err;
            });
            for (var i = 0; i < res.length; i++) {
              if (res[i].department_name === Ndept )
                 NdeptId = parseInt(res[i].department_id);
               
              }
           
            
            console.log( "NdeptId  "+NdeptId); */
            connection.query("INSERT into products(product_name,price,department_name,stock_quantity,prodsale) VALUES ('" +
            Nname +"','" + Ncost +"','" + Ndept + "','" + Nstock + "', '" + Nprodsale + "' )"
            ),
            console.log( Nname + " Product has been added"),
            function (err) {
                if (err)throw err
               
             
            // runSearch();
            
       
        
            }  
        runSearch();
         })

        
}
function exit(){
    console.log("Bye..");
connection.end();
}

      
