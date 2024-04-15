require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createRouter = require("./routes");
const mongoDbConnect = require("./config/db/mongoDb");
const { sortMiddleware, searchMiddleware, limitMiddleware } = require("./app/middlewares");

// Kết nối với MongoDB
mongoDbConnect.connect();

const app = express();
const PORT = process.env.PORT || 5000;

//? Middlewares
app.use(morgan("dev"));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(express.urlencoded({ extended: true })); // Middleware FormData HTML from request
app.use(express.json()); // Middleware JSON from request
app.use(sortMiddleware); // Sort middleware
app.use(searchMiddleware); // Search middleware
app.use(limitMiddleware); // Limit & Offset middleware

// Tạo các routes
createRouter(app);

app.use((req, res, next) => {
	res.json({
		code: 999,
		message: "URL không tồn tại",
	});
});
app.use((err, req, res, next) => {
	console.error(err);
	res.json({
		code: err.status,
		message: err.message,
	});
});

//? Khởi chạy máy chủ
app.listen(PORT, () => {
	console.log(`Máy chủ đang chạy tại: http://localhost:${PORT}`);
});
