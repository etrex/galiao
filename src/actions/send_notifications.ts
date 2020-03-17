import { LineContext } from "bottender";
import SendNotificationFrom from "../core/send_notification_from"
import { subscriptions } from "../entity/subscriptions";

function getName(context){
  if(context.session.user){
    return context.session.user.displayName || '那個誰'
  }
  return "system"
}

export default async function SendNotifications(context: LineContext): Promise<void> {
  const group = await subscriptions.findOne({ session_id: context.session.id })

  // 只有開啟尬聊的群組訊息會被發送出去
  if(group == undefined)
    return;

    const message = `${getName(context)}說: ${context.event.text}`;
  SendNotificationFrom(context.session.id, message);
}