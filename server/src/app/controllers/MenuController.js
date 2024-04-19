const MenuSchema = require("../models/MenuModel");
const { menuValidation } = require("../validation");

class MenuController {
	// [GET] /menu
	async getAll(req, res, next) {
		try {
			// Lấy danh sách menu
			const result = await MenuSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách menu
			const allRecords = await MenuSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allRecords.length,
					message: "Get all menu successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No menu found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /menu/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Tìm menu theo id
			const result = await MenuSchema.findOne({
				_id: id,
			});

			if (result) {
				res.json({
					code: 0,
					data: result,
					message: "Find menu successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No menu found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /menu
	async create(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = menuValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra name | pathname menu đã tồn tại chưa
			const itemExisted = await MenuSchema.findOne({
				$or: [{ name: payload.name }, { pathname: payload.pathname }]
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Name or Pathname already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newRecord = new MenuSchema(payload);
			const createResult = await MenuSchema.create(newRecord);

			res.json({
				code: 0,
				message: "Create menu successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /menu/:id
	async update(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = menuValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra name | pathname menu đã tồn tại chưa
			const itemExisted = await MenuSchema.findOne({
				_id: {
					$not: {
						$eq: id,
					}
				},
				$or: [{ name: payload.name }, { pathname: payload.pathname }],
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Menu name or pathname already exists",
				});
				return;
			}

			// Cập nhật dữ liệu mới theo id
			const updateResult = await MenuSchema.updateOne(
				{
					_id: id,
				},
				payload
			);

			if (updateResult.modifiedCount > 0) {
				res.json({
					code: 0,
					message: "Update menu successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No menu found to update",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /menu/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Xóa menu trong CSDL
			const deleteResult = await MenuSchema.deleteOne({
				_id: id,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 0,
					message: "Delete menu successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No menu found to delete",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new MenuController();
