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
            "View Product Sales by Department",
            "Create New Department",         
             "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Product Sales by Department":
          deptProdSaleView();
          break;
  
        case "Create New Department":
          addNewDeptView();
          break;
  
         case "Exit":
           exit();
           break;
        }
      });
  }
  /*If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.*/
  function deptProdSaleView() {
      -//console.log("In deptSaleView");
    connection.query("SELECT  department_id, department_name, over_head_costs, product_sales, ( product_sales - over_head_costs) AS total_profit   FROM ( "+
    "SELECT d.department_id, d.department_name, d.over_head_costs, sum(p.prodSale) AS product_sales  FROM  departments d "+
      "JOIN products p "+
      "ON d.department_name = p.department_name "+
      "GROUP BY d.department_id, d.department_name, d.over_head_costs) dept_info "+
      "ORDER BY 1", function(err, res) {
      var table = new Table({
        head: ['Dept ID', 'Department Name', 'Over Head Cost', 'Product Sales', 'Total Profit']
    });
        
        console.log('*******************************************************');
        console.log('***********View all Product Sales by Department*******');
        console.log('******************************************************');
        for (var i = 0; i < res.length ; i++) {
        table.push([res[i].department_id , res[i].department_name , res[i].over_head_costs.toFixed(2), res[i].product_sales.toFixed(2), res[i].total_profit.toFixed(2)]);
      }
      console.log("*********************************************************************");
      console.log(table.toString());
      runSearch();
    });
  }

  function addNewDeptView() {
    inquirer.prompt([
        {
            name: "dname",
            type: "input",
            message: "Enter the name of the new department to be added."
        },
        {
            name: "ocost",
            type: "input",
            message: "Enter the over head cost for the new department entered."
        },])
        .then(function(input){
            var Newname = input.dname;
            var Newcost = input.ocost;
            connection.query("INSERT into departments(department_name,over_head_costs) VALUES (" +'"'+
            Newname +'"'+ ','+'"' + Newcost  +'"'+')'
            ),
            console.log( Newname + " Department has been added"),
            function (err) {
                if (err)throw err
        
            }  
            runSearch();
        })
}
  

  function exit(){
    console.log("Bye..");
connection.end();
  }
