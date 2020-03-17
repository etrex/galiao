import { LineContext } from "bottender";
import { subscriptions } from "../entity/subscriptions";

export default async function CancelSubscription(context: LineContext): Promise<void> {
  const groups = await subscriptions.find({ where: { session_id: context.session.id }});
  groups.forEach(group => {
    group.remove();
  });
  await context.sendText('停止尬聊');
}