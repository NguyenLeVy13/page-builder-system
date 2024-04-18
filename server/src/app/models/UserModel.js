const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, maxLength: 255, required: true, unique: true },
	password: { type: String, maxLength: 255, required: true },
	fullName: { type: String, maxLength: 255, required: true },
	roleId: { type: String, required: true },
}, { timestamps: true });

// Hash password pre save or create user
// Dont use arrow function because it does not have context
UserSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(this.password, salt);
		this.password = hashPassword;
		next();
	} catch (error) {
		next(error);
	}
});

// Custom query
UserSchema.query.sortable = function (req) {
	const isSort =
		req.query.hasOwnProperty("sortColumn") &&
		req.query.hasOwnProperty("sortType");

	if (isSort) {
		const sortColumn = req.query.sortColumn;
		const sortType = ["asc", "desc"].includes(req.query.sortType)
			? req.query.sortType
			: "asc";

		return this.sort({
			[sortColumn]: sortType,
		});
	}

	return this;
};
UserSchema.query.searchable = function (req) {
	const isSearch =
		req.query.hasOwnProperty("searchType") &&
		req.query.hasOwnProperty("searchValue");

	if (isSearch) {
		const searchType = req.query.searchType;
		const searchValue = req.query.searchValue;

		return this.regex(searchType, new RegExp(".*" + searchValue + ".*", "i"));
	}

	return this;
};
UserSchema.query.limitable = function (req) {
	const isLimit = req.query.hasOwnProperty("limit");
	const isOffset = req.query.hasOwnProperty("offset");

	if (isLimit && isOffset) {
		const limit = +req.query.limit;
		const offset = +req.query.offset;
		return this.skip(offset).limit(limit);
	} else if (isLimit) {
		const limit = +req.query.limit;
		return this.limit(limit);
	} else if (isOffset) {
		const offset = +req.query.offset;
		return this.skip(offset);
	}

	return this;
};

// Custom methods
UserSchema.methods.isMatchPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {}
};

module.exports = mongoose.model("users", UserSchema);
