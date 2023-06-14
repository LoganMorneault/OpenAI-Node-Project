"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_json_1 = __importDefault(require("./config.json"));
const openai_controller_1 = __importDefault(require("./controllers/openai-controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// A controller is actually a function that consumes the app and adds endpoints.
(0, openai_controller_1.default)(app);
app.listen(config_json_1.default["PORT_NUMBER"], () => {
    console.log(`Express is now listening on port ${config_json_1.default["PORT_NUMBER"]}`);
});
//# sourceMappingURL=app.js.map