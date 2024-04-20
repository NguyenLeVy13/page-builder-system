const UserSchema = require("../models/UserModel");
const { userValidation } = require("../validation");

class UserController {
	// [GET] /users
	async getAll(req, res, next) {
		try {
			// Lấy danh sách user
			const result = await UserSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách user
			const allRecords = await UserSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allRecords.length,
					message: "Get all user successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No user found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /users/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Tìm user theo id
			const result = await UserSchema.findOne({
				_id: id,
			});

			if (result) {
				res.json({
					code: 0,
					data: { ...result._doc, password: undefined },
					message: "Find user successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No user found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /users/register
	async register(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = userValidation.register(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra tài khoản người dùng đã tồn tại chưa
			const userExist = await UserSchema.findOne({
				email: payload.email,
			});
			if (userExist) {
				res.json({
					code: 2,
					message: "Email already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newUser = new UserSchema(payload);

			// Hash password
			newUser.password = await newUser.getHashPassword(payload.password);

			const saveUserResult = await newUser.save();

			res.json({
				code: 0,
				data: { ...saveUserResult._doc, password: undefined },
				message: "Register successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /users/login
	async login(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = userValidation.login(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra email tài khoản người dùng có tồn tại không
			const userExist = await UserSchema.findOne({
				email: payload.email,
			});
			if (!userExist) {
				res.json({
					code: 2,
					message: `Not found email: ${payload.email}`,
				});
				return;
			}

			// Kiểm tra mật khẩu
			const isMatchPassword = await userExist.isMatchPassword(
				payload.password
			);
			if (!isMatchPassword) {
				res.json({
					code: 3,
					message: `Incorrect password for email: ${payload.email}`,
				});
				return;
			}

			// Check role
			if (!userExist.roleId) {
				res.json({
					code: 4,
					message: `This account has no role`,
				});
				return;
			}

			const menuPermissions = await userExist.getMenuPermissions();
			console.log("🚀 ~ UserController ~ login ~ menuPermissions:", menuPermissions)
			const functionPermissions = await userExist.getFunctionPermissions();
			console.log("🚀 ~ UserController ~ login ~ functionPermissions:", functionPermissions)

			res.json({
				code: 0,
				data: {
					...userExist._doc,
					password: undefined,
					menuPermissions,
					functionPermissions,
				},
				message: "Login successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /users/:id/updatePasswordById
	async updatePasswordById(req, res, next) {
		try {
			// Lấy id từ params
			const userId = req.params.id;
			// Lấy password mới từ body của request
			const { newPassword } = req.body;

			// Xác thực password mới
			const { error } = userValidation.updatePassword(newPassword);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Tìm tài khoản người dùng để cập nhật mật khẩu mới (newPassword)
			const userFound = await UserSchema.findOne({
				_id: userId,
			});
			if (!userFound) {
				res.json({
					code: 2,
					message: "No user found to update password",
				});
				return;
			}

			// Cập nhật mật khẩu mới (newPassword)
			// Hash password
			userFound.password = await userFound.getHashPassword(newPassword);

			const saveUserResult = await userFound.save();

			res.json({
				code: 0,
				message: "Update password successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /users/:id/updateRoleById
	async updateRoleById(req, res, next) {
		try {
			// Lấy id từ params
			const userId = req.params.id;
			// Lấy newRoleId mới từ body của request
			const { newRoleId } = req.body;

			// Xác thực role ID
			const { error } = userValidation.updateRole(newRoleId);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Tìm tài khoản người dùng để cập nhật role mới (newRoleId)
			const userFound = await UserSchema.findOne({
				_id: userId,
			});
			if (!userFound) {
				res.json({
					code: 2,
					message: "No user found to update role",
				});
				return;
			}

			// Cập nhật role ID mới (newRoleId)
			userFound.roleId = newRoleId;
			const saveUserResult = await userFound.save();

			res.json({
				code: 0,
				message: "Update role successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /users/:id/updateInfoById
	async updateInfoById(req, res, next) {
		try {
			// Lấy id từ params
			const userId = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = req.body;

			// Xác thực payload
			const { error } = userValidation.updateInfo(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Tìm tài khoản người dùng để cập nhật info mới
			const userFound = await UserSchema.findOne({
				_id: userId,
			});
			if (!userFound) {
				res.json({
					code: 2,
					message: "No user found to update info",
				});
				return;
			}

			// Cập nhật info mới
			if (payload.fullName) {
				userFound.fullName = payload.fullName;
			}
			const saveUserResult = await userFound.save();

			res.json({
				code: 0,
				message: "Update info successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /users/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const id = req.params.id;

			// Xóa user trong CSDL
			const deleteResult = await UserSchema.deleteOne({
				_id: id,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 0,
					message: "Delete user successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No user found to delete",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new UserController();
