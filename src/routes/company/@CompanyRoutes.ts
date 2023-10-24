import { app } from "../../server";
import { Employees } from "./employees";

const CompanyRoutes = async () => {
	app.register(Employees)
}

export { CompanyRoutes }