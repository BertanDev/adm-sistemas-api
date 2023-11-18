import { app } from "../../server.js";
import { TotalRegisteredClient } from "./total-registered-client";

const ClientRoutes = async () => {
	app.register(TotalRegisteredClient)
}

export { ClientRoutes }