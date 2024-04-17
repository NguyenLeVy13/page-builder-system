const TemplateSchema = require("../models/TemplateModel");
const { templateValidation } = require("../validation");

class TemplateController {
	// [GET] /templates
	async getAll(req, res, next) {
		try {
			// Lấy danh sách template
			const result = await TemplateSchema.find({})
				.sortable(req)
				.searchable(req)
				.limitable(req);

			// Lấy tổng danh sách template
			const allTemplates = await TemplateSchema.find({}).searchable(req);

			if (result) {
				res.json({
					code: 0,
					data: result,
					total: allTemplates.length,
					message: "Get all templates successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No template found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [GET] /templates/:id
	async findById(req, res, next) {
		try {
			// Lấy id từ params
			const templateId = req.params.id;

			// Tìm template theo id
			const result = await TemplateSchema.findOne({
				_id: templateId,
			});

			if (result) {
				res.json({
					code: 0,
					data: result,
					message: "Find template successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No template found",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [POST] /templates
	async create(req, res, next) {
		try {
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = templateValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 1,
					message: error.message,
				});
				return;
			}

			// Kiểm tra title template đã tồn tại chưa
			const itemExisted = await TemplateSchema.findOne({
				title: payload.title,
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Template title already exists",
				});
				return;
			}

			// create method in Schema not allowed handle prev middleware in mongoose
			const newTemplate = new TemplateSchema(payload);
			const createResult = await TemplateSchema.create(newTemplate);

			res.json({
				code: 0,
				message: "Create template successfully",
			});
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [PUT] /templates/:id
	async update(req, res, next) {
		try {
			// Lấy id từ params
			const templateId = req.params.id;
			// Lấy dữ liệu payload từ body của request
			const payload = { ...req.body };

			// Xác thực dữ liệu payload
			const { error } = templateValidation.updateOrCreate(payload);
			if (error) {
				res.json({
					code: 2,
					message: error.message,
				});
				return;
			}

			// Kiểm tra title template đã tồn tại chưa
			const itemExisted = await TemplateSchema.findOne({
				$not: {
					_id: templateId,
				},
				title: payload.title,
			});
			if (itemExisted) {
				res.json({
					code: 2,
					message: "Template title already exists",
				});
				return;
			}

			// Cập nhật dữ liệu mới cho movie type theo id
			const updateResult = await TemplateSchema.updateOne(
				{
					_id: templateId,
				},
				payload
			);

			if (updateResult.modifiedCount > 0) {
				res.json({
					code: 0,
					message: "Update template successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No template found to update",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}

	// [DELETE] /templates/:id
	async deleteById(req, res, next) {
		try {
			// Lấy id từ params
			const templateId = req.params.id;

			// Xóa template trong CSDL
			const deleteResult = await TemplateSchema.deleteOne({
				_id: templateId,
			});

			if (deleteResult.deletedCount > 0) {
				res.json({
					code: 0,
					message: "Delete template successfully",
				});
			} else {
				res.json({
					code: 1,
					message: "No template found to delete",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new TemplateController();
