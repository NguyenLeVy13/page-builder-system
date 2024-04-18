const Joi = require("joi");

module.exports = {
	// Xác thực dữ liệu đăng ký
	register(data) {
		const schema = Joi.object({
			email: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.email()
				.messages({
					"string.trim":
						"Email not contain whitespace at the beginning and end",
					"any.required": "Email is required",
					"string.empty": "Email must not be empty",
					"string.email": "Email is invalid",
				}),
			password: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.min(5)
				.messages({
					"string.trim":
						"Password not contain whitespace at the beginning and end",
					"any.required": "Password is required",
					"string.empty": "Password must not be empty",
					"string.min": "Password must contain at least 5 characters",
				}),
			fullName: Joi.string().trim().strict().messages({
				"string.trim":
					"Fullname not contain whitespace at the beginning and end",
				"string.min": "Full name must contain at least 5 characters",
			}),
		});

		return schema.validate(data);
	},

	// Xác thực dữ liệu đăng nhập
	login(data) {
		const schema = Joi.object({
			email: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.email()
				.messages({
					"string.trim":
						"Email not contain whitespace at the beginning and end",
					"any.required": "Email is required",
					"string.empty": "Email must not be empty",
					"string.email": "Email is invalid",
				}),
			password: Joi.string()
				.trim()
				.required()
				.empty()
				.strict()
				.min(5)
				.messages({
					"string.trim":
						"Password not contain whitespace at the beginning and end",
					"any.required": "Password is required",
					"string.empty": "Password must not be empty",
					"string.min": "Password must contain at least 5 characters",
				}),
			fullName: Joi.string().trim().strict().messages({
				"string.trim":
					"Fullname not contain whitespace at the beginning and end",
				"string.min": "Full name must contain at least 5 characters",
			}),
		});

		return schema.validate(data);
	},

	// Xác thực mật khẩu khi cập nhật mật khẩu mới
	updatePassword(password) {
		const schema = Joi.string()
			.trim()
			.required()
			.empty()
			.strict()
			.min(5)
			.messages({
				"string.trim":
					"Password not contain whitespace at the beginning and end",
				"any.required": "Password is required",
				"string.empty": "Password must not be empty",
				"string.min": "Password must contain at least 5 characters",
			});

		return schema.validate(password);
	},

	// Xác thực role ID khi cập nhật role
	updateRole(roleId) {
		const schema = Joi.string()
			.trim()
			.required()
			.empty()
			.strict()
			.messages({
				"string.trim":
					"Role ID not contain whitespace at the beginning and end",
				"any.required": "Role ID is required",
				"string.empty": "Role ID must not be empty",
			});

		return schema.validate(roleId);
	},
};
