import { LineContext } from "bottender";

export default async function HandleFollow(context: LineContext): Promise<void> {
  context.sendText("想尬聊就邀我進群組");
}