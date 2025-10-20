"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const brainRoutes_1 = __importDefault(require("./routes/brainRoutes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", authRoutes_1.default);
app.use("/api/v1/content", auth_1.authMiddleware, contentRoutes_1.default);
app.use("/api/v1/brain", auth_1.authMiddleware, brainRoutes_1.default);
//route
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/check", (req, res) => {
    console.log(req.cookies);
    res.json(req.cookies);
});
(0, db_1.connectDb)().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
