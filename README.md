# 📦 Inventory Management System

### **A robust inventory management system with a React + TypeScript client, a TypeScript server, and PostgreSQL database integration.**

---

## 🚀 Quick Start

### **1. Install Dependencies for backend**
```bash
npm install
```

### **4. Run Database Migrations**
```bash
npx sequelize-cli db:migrate
```

### **5. Seed the Database**
```bash
npx sequelize-cli db:seed:all
```

### **2. Run the Server**

You need nodemon for this to work

```bash
npm run dev 
```

### **3. Run the Client**

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
- **`jsonwebtoken`**: Secure authentication using JWT tokens.
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

---

## 🌟 Features

### **Core Functionality**
- **Inventory Tracking**: Monitor stock levels of products across multiple warehouses.
- **Dynamic Reordering**:
  - Automatically create purchase orders when stock falls below the reorder threshold.
  - Integrates with a cron job to process updates at scheduled intervals.
- **Purchase Order Management**:
  - Create, read, and update purchase orders for products.
- **Stock Level Updates**:
  - Update stock levels manually or automatically upon order arrival.

### **Performance Enhancements**
- **Caching**:
  - Cache read queries to improve response times for frequently accessed data.
- **ACID Compliance**:
  - Transactions are implemented for critical database updates to ensure atomicity.

---

## 🔄 API Endpoints

### **Products**
| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| GET    | `/api/products`      | Fetch all products.           |
| PUT    | `/api/products/:id`  | Update product stock levels.  |

### **Suppliers**
| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| GET    | `/api/suppliers`     | Fetch all suppliers.          |

### **Purchase Orders**
| Method | Endpoint                      | Description                               |
|--------|--------------------------------|-------------------------------------------|
| GET    | `/api/purchase-orders`        | Fetch all purchase orders.               |
| POST   | `/api/purchase-orders`        | Create a new purchase order.             |
| PUT    | `/api/purchase-orders/:id`    | Update purchase order status or details. |

---

## 🧩 System Design Considerations

### **Automatic Stock Level Updates**
- A REST API is implemented to update stock levels upon arrival of orders.
- A cron job can be used to automate this process daily or at a specified interval.

### **Database Transactions**
- Transactions are implemented for critical database updates (e.g., updating stock levels or purchase orders) to ensure ACID compliance.

### **Caching**
- Frequently read queries, such as fetching product lists or purchase orders, can be cached to enhance performance and reduce database load.

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

---

## 🔧 Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repository/inventory-management.git
cd inventory-management
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure the Database**
- Create a PostgreSQL database and update the `config.json` file in `src/database/config/`:

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

### **4. Run Migrations and Seeders**
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### **5. Start the Server**
```bash
npm run start
```

### **6. Start the Client**
```bash
npm run start:client
```

---

## 🔍 Testing
- Write unit tests for services and controllers.
- Use tools like Jest and Supertest for API testing.

---

## 📘 Documentation
API documentation is generated using Swagger and is available at:
```
http://localhost:5002/api-docs
```

---

## 🤝 Contributing
Feel free to submit issues or pull requests to improve the project. Contributions are welcome!

---

## 📜 License
This project is licensed under the MIT License.

