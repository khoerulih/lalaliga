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
  "endpoint": "https://fcm.googleapis.com/fcm/send/cjICYJfKpBw:APA91bHtUT-oGzUwg6Dem-SHu1RCP4YFxW3ESIR-UhpxIyYnoD7Y0h0gIVAdQPEDV-jKu3Qwp-3uWZQgl4Y-sSjT0_gpiw0W2zg_jHpuCw8DT3qTSAa412cwZVEa_4mnsomFN_miod19",
  "keys": {
    "p256dh": "BCSg/MBHcJOBt+KbKH4UrEw3O1ZQeBcjkpVIXHb0DdSmIxb5pfSbN2BSL3q2L+xukWDVAm6p+QwfX0TWc5kA5ow=",
    "auth": "SMWJwFzrz+2YPya6Bm6lmQ=="
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