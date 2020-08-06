var webPush = require('web-push');

const vapidKeys = {
  "publicKey":"BHEtxd8CZ3PtGxhFXFNvukLDHK49dyMOFnEtBA_HMecSR66Jvue9TR5jTCv75l9EtYEjHFgOxSgRSwoLRi95FuE",
  "privateKey":"qYhrqDUfajr3QRHPkGJidZ147OnIFCUazcW3LsYDhAk"
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fFm8sGLlA4c:APA91bHL869cElhbal0ypxzSJglmVPlpUNOL_N1s0V7pCsCZCwmnMCGZnTSu0orVSVd7ISas6g59vsm3b0RTCj9DAAjIVE7lBwLmqttOaeAQnmJRLzmjj7WQLKFst27CamRznhs3WDzb",
  "keys": {
    "p256dh": "BMDfaiW8aQBDsAEEl2x7L3mI9uh++vDRL+CO9zF84FCB+pPr/uM2wchLjbK8lSeW+oXw0+3KRkcjxCQ3CqEambA=",
    "auth": "8Mx9DLZap6hOGbe4Q7YrUg=="
  }
};

var payload = 'Welcome in LaLiga!!';

var options = {
  gcmAPIKey: '336683535237',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);