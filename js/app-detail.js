import loadDetailNav from './component/detail-nav.js';
import team from './loader/detailteam-loader.js';
import fab from './component/fab.js';

document.addEventListener("DOMContentLoaded", () => {
  const elemsTabs = document.querySelectorAll('.tabs');
  M.Tabs.init(elemsTabs);
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));
  let isFavourited = urlParams.get("saved");
  // M.Tabs.getInstance(elemsTabs).swipeable(true);
  let btnFav = document.getElementById("favorite");
  let btnDelete = document.getElementById("delete");

  loadDetailNav();

  team.infoTeamLoader(idParam);
  team.scheduledMatchLoader(idParam);
  team.finishedMatchLoader(idParam);

  if(isFavourited){
    btnFav.style.display = 'none';
    btnDelete.style.display = 'block';
    fab.fabDelete(idParam);
  }else{
    btnFav.style.display = 'block';
    btnDelete.style.display = 'none';
    fab.fabFavourite(idParam);
  }
});

if(!('serviceWorker' in navigator)) {
  console.log("Service Worker belum didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}

function registerServiceWorker() {
  return navigator.serviceWorker.register("/sw.js")
  .then((reg) => {
    console.log("Pendaftaran Service Worker berhasil");
    return reg;
  })
  .catch(function(err) {
    console.error("Pendaftaran Service Worker gagal : ", err);
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
        })
      }
    })
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