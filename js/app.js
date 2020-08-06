import pageLoader from './loader/page-loader.js';
import loadNav from './component/nav.js';

document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  const elemsTabs = document.querySelectorAll('.tabs');
  M.Tabs.init(elemsTabs);
  // M.Tabs.getInstance(elemsTabs).swipeable(true);

  loadNav();
  
  let page = window.location.hash.substr(1);
  if(page == "") page = "home";
  pageLoader(page);

});

if(!('serviceWorker' in navigator)) {
  console.log("Service Worker belum didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}

function registerServiceWorker() {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => {
        console.log("Pendaftaran Service Worker berhasil");
      })
      .catch(() => {
        console.log("Pendaftaran Service Worker gagal");
      });
  });
}

function requestPermission() {
  if('Notification' in window){
    Notification.requestPermission().then((result) => {
      if(result === "denied"){
        console.log("Fitur notifikasi tidak diijinkan oleh pengguna");
        return;
      } else if (result === "default"){
        console.error("Pengguna menutup kotak dialog permintaan izin fitur notifikasi");
        return;
      }

      if(('PushManager' in window)){
        navigator.serviceWorker.getRegistration()
        .then((registration) => {
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BHEtxd8CZ3PtGxhFXFNvukLDHK49dyMOFnEtBA_HMecSR66Jvue9TR5jTCv75l9EtYEjHFgOxSgRSwoLRi95FuE")
          })
          .then((subscribe) => {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey('p256dh'))
            )));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey('auth'))
            )));
          })
          .catch((err) => {
            console.error('Tidak dapat melakukan subscribe ', err.message);
          })
        });
      }
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}