"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const table_1 = __importDefault(require("./routes/table"));
(0, dotenv_1.config)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const corsOptions = {
        origin: ["http://localhost:3000"],
        credentials: false,
    };
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(corsOptions));
    app.use("/table", table_1.default);
    const port = parseInt(process.env.PORT, 10);
    app.listen(port, () => {
        console.log(`App runing at http://localhost:${port}`);
    });
});
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map