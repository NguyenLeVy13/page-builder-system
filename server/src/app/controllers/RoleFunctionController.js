const RoleFunctionSchema = require("../models/RoleFunctionModel");
const { roleFunctionValidation } = require("../validation");

class RoleFunctionController {
	// [GET] /roleFunctions
	async getAll(req, res, next) {
		try {
			// Lấy danh sách role-function
			const result = await RoleFunctionSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách role-function
			const allRecords = await RoleFunctionSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allRecords.length,
					message: "Get all role-function successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role-function found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /roleFunctions/register
	async register(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = roleFunctionValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra role-function đã tồn tại chưa
			const itemExisted = await RoleFunctionSchema.findOne({
				roleId: payload.roleId,
				functionId: payload.functionId
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Role-function already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newRecord = new RoleFunctionSchema(payload);
			const createResult = await RoleFunctionSchema.create(newRecord);

			res.json({
				code: 0,
				message: "Create role-function successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /roleFunctions/deregister
	async deregister(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xóa role-function trong CSDL
			const deleteResult = await RoleFunctionSchema.deleteOne({
				roleId: payload.roleId,
				functionId: payload.functionId
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 0,
					message: "Delete role-function successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role-function found to delete",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new RoleFunctionController();
