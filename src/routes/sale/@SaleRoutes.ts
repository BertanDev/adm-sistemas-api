import { app } from "../../server";
import { SalesOnCurrentMonth } from "./sales-on-current-month";
import { SalesOnCurrentMonthMoney } from "./sales-on-current-month-money";
import { SalesOnPreviousMonth } from "./sales-on-previous-month";
import { SalesOnPreviousMonthMoney } from "./sales-on-previous-month-money";
import { TotalSalesPerSeller } from "./total-sales-per-seller";

const SaleRoutes = async () => {
	app.register(TotalSalesPerSeller)
	app.register(SalesOnCurrentMonth)
	app.register(SalesOnCurrentMonthMoney)
	app.register(SalesOnPreviousMonth)
	app.register(SalesOnPreviousMonthMoney)
}

export { SaleRoutes }