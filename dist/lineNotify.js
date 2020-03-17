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
const querystring = require('querystring');
const axios = require('axios');
function getAuthLink(clientId, redirectUrl, state) {
    const data = {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUrl,
        scope: 'notify',
        state,
    };
    return `https://notify-bot.line.me/oauth/authorize?${querystring.encode(data)}`;
}
function getToken(code, redirectUri, clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://notify-bot.line.me/oauth/token';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const formData = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        };
        return yield axios.post(url, querystring.encode(formData), { headers });
    });
}
function sendNotify(token, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://notify-api.line.me/api/notify';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
        };
        const formData = {
            message,
        };
        return yield axios.post(url, querystring.encode(formData), { headers });
    });
}
exports.default = {
    getAuthLink,
    getToken,
    sendNotify,
};
