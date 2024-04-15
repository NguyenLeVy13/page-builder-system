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
					totalLength: allTemplates.length,
					message: "Lấy danh sách template thành công",
				});
			} else {
				res.json({
					code: 1,
					message: "Lấy danh sách template thất bại",
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
					message: "Đã tìm thấy template",
				});
			} else {
				res.json({
					code: 1,
					message: "Không tìm thấy template",
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

			// create method in Schema not allowed handle prev middleware in mongoose
			const newTemplate = new TemplateSchema(payload);
			const createResult = await TemplateSchema.create(newTemplate);

			res.json({
				code: 0,
				message: "Tạo template thành công",
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
					message: "Cập nhật template thành công",
				});
			} else {
				res.json({
					code: 1,
					message: "Không phát hiện dữ liệu cần chỉnh sửa",
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
					message: "Xóa template thành công",
				});
			} else {
				res.json({
					code: 1,
					message: "Không tìm thấy template cần xóa",
				});
			}
		} catch (error) {
			// Bắt lỗi
			next(error);
		}
	}
}

module.exports = new TemplateController();
