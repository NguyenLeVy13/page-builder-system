const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect(process.env.URI_MONGODB_USERS, {});
		console.log("Kết nối MongoDB thành công");
	} catch (error) {
		console.error('Kết nối MongoDB thất bại: ', error);
	}
}

module.exports = { connect };
