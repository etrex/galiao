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
const lineNotify_1 = __importDefault(require("../lineNotify"));
const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
const redirectUri = `${process.env.ROOT_PATH}/callback`;
function SubscriptionRequest(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = lineNotify_1.default.getAuthLink(clientId, redirectUri, context.session.id);
        yield context.sendFlex('請點選按鈕來尬聊一波：', {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: "尬聊設定",
                        weight: "bold",
                        size: "md"
                    },
                    {
                        type: "text",
                        text: "請點選下方按鈕，在選擇 「請選擇您要接收通知的聊天室」 時請選擇本群組，並且在訂閱完成後將 LINE Notify 邀請加入本群組。",
                        margin: "md",
                        wrap: true,
                        size: "xs"
                    },
                    {
                        type: "button",
                        action: {
                            type: "uri",
                            label: "開啟尬聊",
                            uri,
                        },
                        style: "primary",
                        margin: "lg"
                    },
                    {
                        type: "button",
                        action: {
                            type: "message",
                            label: "停止尬聊",
                            text: "停止尬聊",
                        },
                        style: "primary",
                        margin: "lg"
                    }
                ]
            }
        });
    });
}
exports.default = SubscriptionRequest;
