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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const bottender_1 = require("bottender");
const lineNotify_1 = __importDefault(require("./lineNotify"));
const subscriptions_1 = require("./entity/subscriptions");
const send_notification_from_1 = __importDefault(require("./core/send_notification_from"));
const app = bottender_1.bottender({
    dev: process.env.NODE_ENV !== 'production',
});
const port = Number(process.env.PORT) || 5000;
// the request handler of the bottender app
const handle = app.getRequestHandler();
const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
const clientSecret = process.env.LINE_NOTIFY_CLIENT_SECRET;
const redirectUri = `${process.env.ROOT_PATH}/callback`;
app.prepare().then(() => {
    const server = express_1.default();
    server.use(body_parser_1.default.json({
        verify: (req, _, buf) => {
            req.rawBody = buf.toString();
        },
    }));
    // routes for LINE Notify
    server.get('/callback', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.query.code;
            const session_id = req.query.state;
            const response = yield lineNotify_1.default.getToken(code, redirectUri, clientId, clientSecret);
            const token = response.data.access_token;
            subscriptions_1.subscriptions.build({ token, session_id });
            send_notification_from_1.default(undefined, "有人想尬聊一波囉！");
            res.send('恭喜完成設定，請關閉此網頁！');
        });
    });
    server.get('/sendMessage', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = `系統公告: ${req.query.message}`;
            send_notification_from_1.default(undefined, message);
            res.send('推播訊息發送完成，請關閉此網頁！');
        });
    });
    // route for webhook request
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, err => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
