import { app } from "../../server";
import { MostExpensiveProducts } from "./most-expensive-products";

const ProductRoutes = async () => {
	app.register(MostExpensiveProducts)
}

export { ProductRoutes }