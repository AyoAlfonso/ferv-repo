# 📦 Inventory Management System

### **A robust inventory management system with a React + TypeScript client, a TypeScript server, and PostgreSQL database integration.**

---


---

## 🔧 Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/AyoAlfonso/ferv-repo
cd inventory-management
```

### **2. Install Dependencies for backend**
```bash
npm install
```

### **3. Set Database Config**

- Create a PostgreSQL database and update the `config.json` file in `src/database/config/`: or use the one I have provided in the env.development.local file

```json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "inventory_management",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### **4. Run Database Migrations**
```bash
npx sequelize-cli db:migrate
```

### **5. Seed the Database**
```bash
npx sequelize-cli db:seed:all
```


### **6. Run the Server**

You need nodemon for this to work

```bash
npm run dev 
```

### **7. Run the Client**

```bash
cd client
npm install
```
```bash
npm run dev
```

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React
- **Language**: TypeScript

### **Backend**
- **Framework**: Express
- **Language**: TypeScript
- **Database ORM**: Sequelize
- **Database**: PostgreSQL

### **Key Packages**
- **`express`**: Backend framework for building REST APIs.
- **`pg`**: PostgreSQL integration.
- **`sequelize`**: ORM for managing database models and migrations.
- **`swagger-jsdoc`** & **`swagger-ui-express`**: For API documentation.
- **`typedi`**: Dependency injection.
- **`winston`** & **`winston-daily-rotate-file`**: Logging framework for tracking server events.

---

## 🛡️ Database Design

### **Entity Relationships**

- **Products ↔ Suppliers**: Many-to-Many
- **Products ↔ PurchaseOrders**: One-to-Many
- **Suppliers ↔ PurchaseOrders**: One-to-Many
- **Warehouses ↔ PurchaseOrders**: One-to-Many

### **Details**

- **Many-to-Many: Supplier ↔ Products**:
  - A product can be supplied by multiple suppliers.
  - A supplier can supply multiple products.

- **One-to-Many: Products ↔ PurchaseOrders**:
  - A product can have multiple purchase orders.

- **One-to-Many: Suppliers ↔ PurchaseOrders**:
  - A supplier can handle multiple purchase orders.

- **One-to-Many: Warehouses ↔ PurchaseOrders**:
  - A warehouse can fulfill multiple purchase orders.

## Tables created in the database:
- suppliers
- warehouses
- products
- purchase_orders

Added two new tables for better querying 
- product_warehouses
- product_suppliers


## 🌟 Features

### **Core Functionality**

- **Inventory Tracking**: Monitor stock levels of products across multiple warehouses using this cron "schedulePeriodicJobs" 
- **Dynamic Reordering**:
  - Automatically create purchase orders when stock falls below the reorder threshold.
  - Integrates with a cron job to process updates at scheduled intervals.
- **Purchase Order Management**:
  - Create, read, and update purchase orders for products.
- **Stock Level Updates**:
  - Update stock levels manually or automatically upon order arrival.

### **Ideas For More Performance Enhancements**
- **Caching**:
  - Cache read queries to improve response times for frequently accessed data.
- **ACID Compliance**:
  - Transactions are implemented for critical database updates to ensure atomicity.

## 🧩 System Design Considerations

### **Automatic Stock Level Updates**
- A REST API is implemented to update stock levels upon arrival of orders.
- A cron job can be used to automate this process daily or at a specified interval.

### **Database Transactions**
- Transactions are implemented for critical database updates (e.g., updating stock levels or purchase orders) to ensure ACID compliance.

### **Caching**
- Frequently read queries, such as fetching product lists or purchase orders, can be cached to enhance performance and reduce database load.

---

## 🔄 API Endpoints

### **Products**
| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| GET    | `/api/products`      | Fetch all products.           |
| PUT    | `/api/products/:id/sell`  | Sell product stock in a warehouse.  |

### **Purchase Orders**
| Method | Endpoint                      | Description                               |
|--------|--------------------------------|-------------------------------------------|
| GET    | `/api/purchase-orders`        | Fetch all purchase orders.               |
| POST   | `/api/purchase-orders`        | Create a new purchase order.             |
| PUT    | `/api/purchase-orders/:id`    | Update purchase order status or details. |
| PATCH  | `/api/purchase-orders/:id/stock`| Fufill purchase order and change status TO COMPLETE 

---

## 🗂️ Project Structure

### **Key Folders**
```
src/
|-- client/                    # React + TypeScript client
|-- src/
    |-- controllers/           # Express controllers
    |-- services/  
    |-- dtos/
    |-- exceptions             
    |-- models/                # Sequelize models
    |-- routes/                # Express routes
    |-- config/                # Config files
    |-- database/
        |-- migrations/        # Sequelize migrations
        |-- seeders/           # Sequelize seeders
    |-- utils/                 # Utility functions
    |-- middlewares/           # Express middlewares
|-- interfaces/                # TypeScript interfaces for entities
```


## Deliverables


### Workflow of the Automatic Reordering Logic
Cron Job Execution:

A cron job (monitorStockLevelsAndReorder) runs at regular intervals (e.g., every 5 seconds using node-schedule).
This job queries the ProductWarehouses table to check the stock levels of all products in each warehouse.
Querying Low Stock Products:

The system identifies products where the stock quantity in a warehouse (ProductWarehouse.stockQuantity) is less than the product's reorder threshold (Product.reorderThreshold).
A query is executed with a join between the ProductWarehouses and Products tables to fetch all such products.
Default Supplier Validation:

For each low-stock product, the system retrieves its default supplier from the ProductSuppliers table.
If no supplier is found, the system logs a warning and skips the product.
Capacity Validation:

Before placing an order, the system checks if the warehouse has enough capacity to accommodate the reordered stock:
It calculates the current stock in the warehouse and adds the reorder quantity.
If the total exceeds the warehouse's capacity, the system adjusts the reorder quantity to fit the available space.
If no space is available, the system logs an error and skips the product.
Check for Existing Pending Orders:

The system checks the PurchaseOrders table for any pending orders for the same product and warehouse.
If a pending order already exists, it skips creating a new order to avoid duplication.
Create a New Purchase Order:

If all validations pass, the system creates a new entry in the PurchaseOrders table:
Links the product, warehouse, and supplier.
Sets the quantity to reorder.
Sets the order date to the current date.
Calculates the expected arrival date based on a fixed lead time

A success log is generated, indicating that a new purchase order has been created.


***Error Handling and Logging***

Errors (e.g., database constraints, missing relationships) are logged for debugging and troubleshooting.
Each step of the process is logged for traceability, including skipped products, adjusted quantities, and successfully created orders.

### Advantages of the Logic

- Prevents overstocking by checking warehouse capacity and adjusting reorder quantities.

- Avoids Duplicate Orders:

- Skips creating new orders if a pending order for the same product and warehouse already exists.

- Make sure a warehous is not overstoking on only one product based o the velocity of sellout. 


### Improvements and Future Enhancements
Dynamic Lead Times:

Use dynamic lead times based on supplier performance or location instead of a fixed 3-day lead time.

Prioritization:
Implement priority logic to handle urgent orders or high-demand products.


## Flow of Operations

**Product Monitoring**

The monitorStockLevelsAndReorder cron job runs every 5 seconds.
It queries the ProductWarehouses table to find products with stock levels below their reorder threshold.
If a product's stock is low, a new purchase order is created unless a pending order already exists.
Warehouse capacity is checked to prevent overstocking.
Stock Adjustments:

Users can manually adjust stock levels via the client interface.
The updateStockLevels method in ProductService handles the adjustments, ensuring changes are reflected in the ProductWarehouses table.
Purchase Order Creation:

When a reorder is triggered, the system creates a new entry in the PurchaseOrders table.
This entry links the product, warehouse, and supplier and includes metadata like the quantity ordered and expected delivery date.
Data Fetching:

The client retrieves data via endpoints provided by ProductController and PurchaseOrderController.
Query results include relationships, such as a product's stock levels in various warehouses or the supplier associated with a purchase order.
