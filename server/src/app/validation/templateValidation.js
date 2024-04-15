const Joi = require("joi");

module.exports = {
	updateOrCreate(data) {
		const schema = Joi.object({
			title: Joi.string().trim().required().empty().strict().messages({
				"string.trim": "Title is not allowed to have leading or trailing whitespace",
				"any.required": "Title is required",
				"string.empty": "Title must not be empty",
			}),
			data: Joi.string().required().empty().strict().messages({
				"any.required": "Data is required",
				"string.empty": "Data must not be empty",
			}),
		});

		return schema.validate(data);
	},
};
