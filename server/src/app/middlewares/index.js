// Sort trên mỗi request / response
// Lưu điều kiện sort
function sortMiddleware(req, res, next) {
	res.locals.sort = {
		enabled: false,
		column: null,
		type: null,
	};

	const isSort = req.query.hasOwnProperty("sortColumn") && req.query.hasOwnProperty("sortType")

	if (isSort) {
		Object.assign(res.locals.sort, {
			enabled: true,
			column: req.query.sortColumn,
			type: req.query.sortType,
		});
	}

	next();
}

// Search trên mỗi request / response
// Lưu điều kiện search
function searchMiddleware(req, res, next) {
	res.locals.search = {
		enabled: false,
		type: null,
		value: null,
	};

	const isSearch = req.query.hasOwnProperty("searchType") && req.query.hasOwnProperty("searchValue")

	if (isSearch) {
		Object.assign(res.locals.search, {
			enabled: true,
			type: req.query.searchType,
			value: req.query.searchValue,
		});
	}

	next();
}

// Limit & Offset trên mỗi request / response
// Lưu điều kiện limit & offset
function limitMiddleware(req, res, next) {
	res.locals.limitAndOffset = {
		enabled: false,
		limit: null,
		offset: null,
	};

	const isLimitAndOffset = req.query.hasOwnProperty("limit") || req.query.hasOwnProperty("offset")

	if (isLimitAndOffset) {
		Object.assign(res.locals.limitAndOffset, {
			enabled: true,
			limit: +req.query.limit,
			offset: +req.query.offset,
		});
	}

	next();
}

module.exports = { sortMiddleware, searchMiddleware, limitMiddleware };
