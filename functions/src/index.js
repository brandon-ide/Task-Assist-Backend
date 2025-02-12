"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require the express module
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// require the cors module
const cors_1 = __importDefault(require("cors"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
// creates an instance of an Express server
const app = (0, express_1.default)();
// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// allow POST and PUT requests to use JSON bodies
app.use(express_1.default.json());
app.use("/", taskRouter_1.default);
// define the port
const port = 3000;
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));
