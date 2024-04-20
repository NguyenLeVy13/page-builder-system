const RoleSchema = require("../models/RoleModel");
const { roleValidation } = require("../validation");

class RoleController {
	// [GET] /roles
	async getAll(req, res, next) {
		try {
			// Lấy danh sách role
			const result = await RoleSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách role
			const allRecords = await RoleSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allRecords.length,
					message: "Get all roles successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /roles/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Tìm role theo id
			const result = await RoleSchema.findOne({
				_id: id,
			});

			if (result) {
				res.json({
					code: 0,
					data: result,
					message: "Find role successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /roles
	async create(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };
			console.log("🚀 ~ RoleController ~ create ~ payload:", payload)

			// Xác thực dữ liệu payload
			const { error } = roleValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra name role đã tồn tại chưa
			const itemExisted = await RoleSchema.findOne({
				name: payload.name,
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Role name already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newRecord = new RoleSchema(payload);
			const createResult = await RoleSchema.create(newRecord);

			res.json({
				code: 0,
				message: "Create role successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /roles/:id
	async update(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = roleValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra name role đã tồn tại chưa
			const itemExisted = await RoleSchema.findOne({
				_id: {
					$not: {
						$eq: id,
					}
				},
				name: payload.name,
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Role name already exists",
				});
				return;
			}

			// Cập nhật dữ liệu mới theo id
			const updateResult = await RoleSchema.updateOne(
				{
					_id: id,
				},
				payload
			);

			if (updateResult.modifiedCount > 0) {
				res.json({
					code: 0,
					message: "Update role successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No role found to update",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /roles/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Xóa role trong CSDL
			const deleteResult = await RoleSchema.deleteOne({
				_id: id,
			});

			if (deleteResult.deletedCount > 0) {
				// Delele user of role
				const removeRoleFromUsers = await UserSchema.updateMany(
					{
						roles: {
							$in: [id],
						},
					},
					{
						$pull: {
							roles: id,
						},
					}
				);

				if (removeRoleFromUsers.modifiedCount > 0) {
					res.json({
						code: 0,
						message: "Delete role successfully",
					});
					return
				}
			}

			res.json({
				code: 1,
				message: "No role found to delete",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new RoleController();
