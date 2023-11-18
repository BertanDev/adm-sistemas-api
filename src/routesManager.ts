import { ClientRoutes } from "./routes/client/@ClientRoutes"
import { CompanyRoutes } from "./routes/company/@CompanyRoutes"
import { FinancialRoutes } from "./routes/financial/@FinancialRoutes"
import { ProductRoutes } from "./routes/product/@ProductRoutes"
import { SaleRoutes } from "./routes/sale/@SaleRoutes"
import { app } from "./server.js"

const routes = async () => {
	app.register(ClientRoutes)
	app.register(ProductRoutes)
	app.register(FinancialRoutes)
	app.register(SaleRoutes)
	app.register(CompanyRoutes)
}

export { routes }