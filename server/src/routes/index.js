const templatesRoute = require("./templatesRoute");

function createRouter(app) {
	if (!app) return;

	app.use("/templates", templatesRoute);
}

module.exports = createRouter;
