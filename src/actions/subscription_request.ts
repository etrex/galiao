import { LineContext } from "bottender";
import lineNotify from "../lineNotify"
const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
const redirectUri = `${process.env.ROOT_PATH}/callback`;

export default async function SubscriptionRequest(context: LineContext): Promise<void> {
  const uri = lineNotify.getAuthLink(clientId, redirectUri, context.session.id);

  await context.sendFlex('請點選按鈕來尬聊一波：', {
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
            label: "尬聊一波",
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
}