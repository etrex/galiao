import lineNotify from "../lineNotify"
import { subscriptions } from "../entity/subscriptions"

export default async function SendNotificationFrom(session_id, message): Promise<void> {
  const groups = await subscriptions.find();
  groups.forEach(group => {
    if(group.session_id !== session_id){
      try{
        lineNotify.sendNotify(group.token, message);
      }catch(error){
      }
    }
  });
}