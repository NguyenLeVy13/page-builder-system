const RoleMenuSchema = require("../models/RoleMenuModel");
const { roleMenuValidation } = require("../validation");

class RoleMenuController {
	// [GET] /roleMenu
	async getAll(req, res, next) {
		try {
			// Lấy danh sách role-menu
			const result = await RoleMenuSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách role-menu
			const allRecords = await RoleMenuSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allRecords.length,
					message: "Get all role-menu successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role-menu found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /roleMenu/register
	async register(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = roleMenuValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra role-menu đã tồn tại chưa
			const itemExisted = await RoleMenuSchema.findOne({
				$and: [
					{ roleId: payload.roleId },
					{ menuId: payload.menuId },
				]
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Role-menu already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newRecord = new RoleMenuSchema(payload);
			const createResult = await RoleMenuSchema.create(newRecord);

			res.json({
				code: 0,
				message: "Create role-menu successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /roleMenu/deregister
	async deregister(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xóa role-menu trong CSDL
			const deleteResult = await RoleMenuSchema.deleteOne({
				$and: [
					{ roleId: payload.roleId },
					{ menuId: payload.menuId },
				]
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 0,
					message: "Delete role-menu successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role-menu found to delete",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new RoleMenuController();
