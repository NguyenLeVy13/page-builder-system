const Joi = require("joi");

module.exports = {
	updateOrCreate(data) {
		const schema = Joi.object({
			name: Joi.string().trim().required().empty().strict().messages({
				"string.trim": "Name is not allowed to have leading or trailing whitespace",
				"any.required": "Name is required",
				"string.empty": "Name must not be empty",
			}),
		});

		return schema.validate(data);
	},
};
