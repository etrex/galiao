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
const send_notification_from_1 = __importDefault(require("../core/send_notification_from"));
const subscriptions_1 = require("../entity/subscriptions");
function getName(context) {
    if (context.session.user) {
        return context.session.user.displayName || '那個誰';
    }
    return "system";
}
function SendNotifications(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = yield subscriptions_1.subscriptions.findOne({ session_id: context.session.id });
        // 只有開啟尬聊的群組訊息會被發送出去
        if (group == undefined)
            return;
        const message = `${getName(context)}說: ${context.event.text}`;
        send_notification_from_1.default(context.session.id, message);
    });
}
exports.default = SendNotifications;
