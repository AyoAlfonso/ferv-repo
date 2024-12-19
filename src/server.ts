import { App } from '@/app';
// import { AuthRoute } from '@routes/auth.route';
import { ProductRoute } from '@routes/products.route';
import { ValidateEnv } from '@utils/validateEnv';
import { PurchaseOrderRoute } from './routes/purchase_order.route';

ValidateEnv();

const app = new App([new ProductRoute(), new PurchaseOrderRoute()]);

app.listen();
