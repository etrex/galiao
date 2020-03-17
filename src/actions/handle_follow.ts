import { LineContext } from "bottender";

export default async function HandleFollow(context: LineContext): Promise<void> {
  context.sendText("Handle Follow");
}