import SubscriptionRequest from './subscription_request'
import { LineContext } from 'bottender';

export default async function HandleJoin(context: LineContext) {
  return SubscriptionRequest;
}