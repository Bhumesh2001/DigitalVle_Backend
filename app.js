const express = require("express");
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true,
}));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/', (req, res) => res.send('🎉 Welcome to the Independent Digital Vle!'));
app.use('/admin', require('./routes/pageRoutes'));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/like-comments', require("./routes/likeCommentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use('/api/subscription-plans', require('./routes/subscriptionPlanRoutes'));
app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use("/api/settings", require("./routes/settingRoutes"));
app.use('/api/admin-articles', require('./routes/adminArticleRoutes'));
app.use('/api/admin-stories', require('./routes/adminStoryRoutes'));
app.use("/api/admin-users", require("./routes/adminUserRoutes"));

// Error Handling Middleware (Always at the end)
app.use(errorHandler);

// Connect to DB & Start Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
