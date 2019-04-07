# Bamazon

#Description
This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package. The application presents two interfaces: customer and manager. We need an MySQL database setup on the machine. so that we create the bamazon database and the product table.


#Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:

        git clone git@github.com:angrbrd/bamazon.git
        cd Bamazon
        npm install
        node BamazonCustomer.js
Buy product
<img width="840" alt="buy" src="https://user-images.githubusercontent.com/43390686/55691553-3c54ab80-596d-11e9-9a44-93ef80b7eca4.png">

View Inventory
<img width="851" alt="inventory" src="https://user-images.githubusercontent.com/43390686/55691557-4080c900-596d-11e9-93f4-4832a9987361.png">


##Manager Interace
The manager interface presents a list of four options, as below.

? Please select an option: (Use arrow keys)
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product
The View Products for Sale option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.

The View Low Inventory option shows the user the items which currently have fewer than 100 units available.

The Add to Inventory option allows the user to select a given item ID and add additional inventory to the target item.

The Add New Product option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

View Product
<img width="859" alt="viewProduct" src="https://user-images.githubusercontent.com/43390686/55691560-48d90400-596d-11e9-8785-381a9662f2c2.png">

View Low inventory product
<img width="825" alt="lowInventory" src="https://user-images.githubusercontent.com/43390686/55691564-5098a880-596d-11e9-8401-4010111d4852.png">


Add new Produce
<img width="854" alt="addPoduct" src="https://user-images.githubusercontent.com/43390686/55691566-542c2f80-596d-11e9-86e1-859f08e32c86.png">