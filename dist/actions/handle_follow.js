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
Object.defineProperty(exports, "__esModule", { value: true });
function HandleFollow(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.sendText("尬聊是跨群組聊天服務，當你把尬聊邀請進入群組並且設定完成之後，這個群組就成為一個尬聊群組。");
        context.sendText("在尬聊群組當中的所有對話都會被發送到其他所有的尬聊群組當中，這意味著尬聊群組內的訊息是對外公開的。");
        context.sendText("想尬聊的話就邀請我和 LINE Notify 進入群組。如果你沒有 LINE Notify 的好友請先點擊以下按鈕：");
        const uri = 'https://line.me/R/ti/p/%40linenotify';
        context.sendFlex('加 LINE Notify 好友', {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "uri",
                            label: "加 LINE Notify 好友",
                            uri,
                        },
                        style: "primary",
                        margin: "lg"
                    }
                ]
            }
        });
    });
}
exports.default = HandleFollow;
