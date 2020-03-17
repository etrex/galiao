import bodyParser from 'body-parser';
import express from 'express';
import { bottender } from 'bottender';
import lineNotify from './lineNotify';
import { subscriptions } from './entity/subscriptions';
import SendNotificationFrom from './core/send_notification_from';

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
const clientSecret = process.env.LINE_NOTIFY_CLIENT_SECRET;
const redirectUri = `${process.env.ROOT_PATH}/callback`;

app.prepare().then(() => {
  const server = express();

  server.use(
    bodyParser.json({
      verify: (req: any, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  // routes for LINE Notify
  server.get('/callback', async function(req, res){
    const code = req.query.code;
    const session_id = req.query.state;
    const response = await lineNotify.getToken(code, redirectUri, clientId, clientSecret);
    const token = response.data.access_token;
    subscriptions.build({ token, session_id });
    res.send('恭喜完成設定，請關閉此網頁！');
  });

  server.get('/sendMessage', async function(req, res){
    const message = `系統公告: ${req.query.message}`;
    SendNotificationFrom(undefined, message);
    res.send('推播訊息發送完成，請關閉此網頁！');
  });

  // route for webhook request
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});