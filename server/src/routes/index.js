const templatesRoute = require("./templatesRoute");
const rolesRoute = require("./rolesRoute");
const menuRoute = require("./menuRoute");
const functionRoute = require("./functionRoute");

function createRouter(app) {
	if (!app) return;

	app.use("/templates", templatesRoute);
	app.use("/roles", rolesRoute);
	app.use("/menu", menuRoute);
	app.use("/functions", functionRoute);
}

module.exports = createRouter;
