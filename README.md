Install dependencies:

npm install

Run the server:

npm run start

Run the client:

npm run start:client

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all



The client is written in React and TypeScript.

The server is written in TypeScript and uses the Sequelize ORM.

The server uses the following packages:

Migrations are writteen in src/database/migrations

express
jsonwebtoken
pg
sequelize
swagger-jsdoc
swagger-ui-express
typedi
winston
winston-daily-rotate-file


Database dialect is PostgreSQL.

Interfaces are written for the entities in the interface folder.

this design doesn't assume that each product is supplied by only one supplier.

 If a product can be supplied by multiple suppliers, the relationship between Products and Suppliers needs to be modeled as a many-to-many relationship instead of the one-to-many relationship in the current design.


Many-to-Many: Supplier ↔ Products.
One-to-Many: Products ↔ PurchaseOrders.
One-to-Many: Suppliers ↔ PurchaseOrders.
One-to-Many: Warehouses ↔ PurchaseOrders.


Migrations are typed with the following import:

 /** @type {import('sequelize-cli').Migration} */


Considerations:
we developed a rest API for Updating stock levels upon arrival of orders.
but in a system we could have it update itself when the day arrives using a cron job 

We can use transactions to update our db valus in a more ACID compliant way.

We could cache our read queries to improve performance.