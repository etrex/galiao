import { LineContext } from "bottender";
import { router, text } from 'bottender/router';
import SubscriptionRequest from './subscription_request'
import SendNotifications from './send_notifications'
import CancelSubscription from './cancel_subscription'

export default async function HandleMessage(context: LineContext): Promise<void> {
  return router([
    text("停止尬聊", CancelSubscription),
    text(/^(尬聊|設定)$/i, SubscriptionRequest),
    text('*', SendNotifications),
  ]);
}