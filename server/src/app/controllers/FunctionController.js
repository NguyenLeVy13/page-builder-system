const FunctionSchema = require("../models/FunctionModel");
const { functionValidation } = require("../validation");

class FunctionController {
	// [GET] /functions
	async getAll(req, res, next) {
		try {
			// Lấy danh sách function
			const result = await FunctionSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách function
			const allRecords = await FunctionSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allRecords.length,
					message: "Get all function successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No function found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /functions/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Tìm function theo id
			const result = await FunctionSchema.findOne({
				_id: id,
			});

			if (result) {
				res.json({
					code: 0,
					data: result,
					message: "Find function successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No function found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /functions
	async create(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = functionValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra name | key function đã tồn tại chưa
			const itemExisted = await FunctionSchema.findOne({
				$or: [{ name: payload.name }, { key: payload.key }]
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Function name or key already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newRecord = new FunctionSchema(payload);
			const createResult = await FunctionSchema.create(newRecord);

			res.json({
				code: 0,
				message: "Create function successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /functions/:id
	async update(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = functionValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra name | key function đã tồn tại chưa
			const itemExisted = await FunctionSchema.findOne({
				_id: {
					$not: {
						$eq: id,
					}
				},
				$or: [{ name: payload.name }, { key: payload.key }]
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Function name or key already exists",
				});
				return;
			}

			// Cập nhật dữ liệu mới theo id
			const updateResult = await FunctionSchema.updateOne(
				{
					_id: id,
				},
				payload
			);

			if (updateResult.modifiedCount > 0) {
				res.json({
					code: 0,
					message: "Update function successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No function found to update",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /functions/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Xóa function trong CSDL
			const deleteResult = await FunctionSchema.deleteOne({
				_id: id,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 0,
					message: "Delete function successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No function found to delete",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new FunctionController();
