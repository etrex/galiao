
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { LineContext } from 'bottender';
import { router, line } from 'bottender/router';

import HandleFollow from './actions/handle_follow';
import HandleJoin from './actions/handle_join';
import HandleMessage from './actions/handle_message';

createConnection()
  .then(async connection => {
    console.log('Connection established.');
  })
  .catch(error => console.log(error));

export default async function App(context: LineContext): Promise<void> {
  return router([
    line.follow(HandleFollow),
    line.join(HandleJoin),
    line.message(HandleMessage),
  ]);
}
