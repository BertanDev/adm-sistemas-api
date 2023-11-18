import { app } from "../../server.js";
import { MostExpensiveProducts } from "./most-expensive-products";

const ProductRoutes = async () => {
	app.register(MostExpensiveProducts)
}

export { ProductRoutes }