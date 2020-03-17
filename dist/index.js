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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const router_1 = require("bottender/router");
const handle_follow_1 = __importDefault(require("./actions/handle_follow"));
const handle_join_1 = __importDefault(require("./actions/handle_join"));
const handle_message_1 = __importDefault(require("./actions/handle_message"));
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connection established.');
}))
    .catch(error => console.log(error));
function App(context) {
    return __awaiter(this, void 0, void 0, function* () {
        return router_1.router([
            router_1.line.follow(handle_follow_1.default),
            router_1.line.join(handle_join_1.default),
            router_1.line.message(handle_message_1.default),
        ]);
    });
}
exports.default = App;
