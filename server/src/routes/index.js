const templatesRoute = require("./templatesRoute");
const rolesRoute = require("./rolesRoute");
const menuRoute = require("./menuRoute");
const functionsRoute = require("./functionsRoute");
const roleFunctionsRoute = require("./roleFunctionsRoute");
const roleMenuRoute = require("./roleMenuRoute");
const usersRoute = require("./usersRoute");

function createRouter(app) {
	if (!app) return;

	app.use("/templates", templatesRoute);
	app.use("/roles", rolesRoute);
	app.use("/menu", menuRoute);
	app.use("/functions", functionsRoute);
	app.use("/roleFunctions", roleFunctionsRoute);
	app.use("/roleMenu", roleMenuRoute);
	app.use("/users", usersRoute);
}

module.exports = createRouter;
