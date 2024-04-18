const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleFunctionSchema = new Schema({
	roleId: { type: String, required: true },
	functionId: { type: String, required: true },
});

// Custom query
RoleFunctionSchema.query.sortable = function (req) {
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
RoleFunctionSchema.query.searchable = function (req) {
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
RoleFunctionSchema.query.limitable = function (req) {
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

module.exports = mongoose.model("role_functions", RoleFunctionSchema);
