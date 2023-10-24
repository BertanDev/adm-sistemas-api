import { app } from "../../server";
import { TotalRegisteredClient } from "./total-registered-client";

const ClientRoutes = async () => {
	app.register(TotalRegisteredClient)
}

export { ClientRoutes }