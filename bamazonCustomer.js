//dependencies
let mysql = require("mysql"),
    inquirer = require("inquirer"),
    //connect to sql db
    connection = mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "password",
        database: "bamazon"
    }),
    //choice is the item_id choosen & amount is the amount wanted
    choice,
    amount;

//check connetion w/ sql db
connectionDB = () => {

    connection.connect(err => {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");

        connection.end();
    });

}

//displays products for sale info
connection.query("select * from products", (err, res) => {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " " + res[i].product_name + " $" + res[i].price + " In Stock: " + res[i].stock_quantity);
    }    
    console.log("");
    //starts up inquierer
    menu();
});

//check to see if item_id is availible
checkID = (choice) => {
    connection.query("select item_id from products", (err, res) => {
        if (err) throw err;

        let idFound = false;


        for (let j = 0; j < res.length; j++) {
            if (res[j].item_id == choice) idFound = true;
        }

        //if item_id is correct call checkAvailibilty function
        if (idFound) {            
            checkAvailibilty(amount);
        } else {
            console.log("\nItem ID not found");
            connection.end();
        }

    });

}

//check to see if item is in stock
checkAvailibilty = (amount) => {    
    connection.query("select item_id, stock_quantity from products", (err, res) => {
        if (err) throw err;

        //if item out of stock display message
        if(res[choice-1].stock_quantity < amount){
            console.log("\nNot enough in stock")
            connection.end();
        } else {
            //if item in stock update data base & display cost
            connection.query("update products set stock_quantity = stock_quantity - ? where item_id = ?;", [amount, choice] ,(err, res) => {
                if(err) throw err;
                
            });

            connection.query("select price from products", (err, res) => {
                if(err)throw err;

                console.log("\nThe total cost is $" + res[choice-1].price*amount);
                connection.end();
            });
        }    

    });


}

//inquierer message
menu = () => {
    inquirer.prompt([
        {
            name: "buy",
            type: "input",
            message: "What is the ID number of the item you would like to buy? ",
            validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy? ",
            validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then((res) => {

        choice = parseInt(res.buy),
        amount = parseInt(res.amount);

        return checkID(choice);
    });

}

