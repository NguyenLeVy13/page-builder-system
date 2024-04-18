const Joi = require("joi");

module.exports = {
	updateOrCreate(data) {
		const schema = Joi.object({
			roleId: Joi.string().trim().required().empty().strict().messages({
				"string.trim": "Role ID is not allowed to have leading or trailing whitespace",
				"any.required": "Role ID is required",
				"string.empty": "Role ID must not be empty",
			}),
			functionId: Joi.string().trim().required().empty().strict().messages({
				"string.trim": "Function ID is not allowed to have leading or trailing whitespace",
				"any.required": "Function ID is required",
				"string.empty": "Function ID must not be empty",
			}),
		});

		return schema.validate(data);
	},
};
