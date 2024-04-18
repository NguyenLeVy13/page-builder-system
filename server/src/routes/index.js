const templatesRoute = require("./templatesRoute");
const rolesRoute = require("./rolesRoute");

function createRouter(app) {
	if (!app) return;

	app.use("/templates", templatesRoute);
	app.use("/roles", rolesRoute);
}

module.exports = createRouter;
