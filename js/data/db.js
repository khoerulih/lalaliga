import idb from '../idb.js';

const dbPromised = idb.open("lalaliga", 1, (upgradeDb) => {
  const teamObjectStore = upgradeDb.createObjectStore("team", {keyPath: "id"});
  teamObjectStore.createIndex("info_team", "info_team", {unique: false});
  teamObjectStore.createIndex("scheduled_match", "scheduled_match", {unique: false});
  teamObjectStore.createIndex("finished_match", "finished_match", {unique: false});
});

const addToFavourite = (info, scheduled, finished) => {
  dbPromised.then((db) => {
      let tx = db.transaction("team", "readwrite");
      let store = tx.objectStore("team");
      let item = {
        id: info.id,
        info_team : info,
        scheduled_match: scheduled,
        finished_match: finished
      };
      store.put(item);
      return tx.complete;
    })
    .then(() => {
      console.log('Data berhasil disimpan');
      M.toast({html: `${info.name} has been added to your favourite team`, classes: 'rounded'});
    })
    .catch((error) => {
      console.log('Data gagal disimpan');
      console.log(error);
      M.toast({html: 'Failed add team to favourite', classes: 'rounded'});
    })
}

const getAll = () => {
  return new Promise((resolve) => {
    dbPromised.then((db) => {
        let tx = db.transaction("team", "readonly");
        let store = tx.objectStore("team");
        return store.getAll();
      })
      .then((team) => {
        resolve(team);
      })
  })
}

const getById = (id) => {
  return new Promise((resolve) => {
    dbPromised.then((db) => {
        let tx = db.transaction("team", "readonly");
        let store = tx.objectStore("team");
        return store.get(id);
      })
      .then((team) => {
        console.log(team);
        resolve(team);
      })
  })
}

const deleteFavourite = (id) => {
  dbPromised.then((db) => {
    let tx = db.transaction("team", "readwrite");
    let store = tx.objectStore("team");
    store.delete(id);
    return tx.complete;
  })
  .then(() => {
    console.log("Success delete item");
    M.toast({html: 'Item has been deleted', classes: 'rounded'});
  })
  .catch((error) => {
    console.log('Failed delete item');
    console.log(error);
    M.toast({html: 'Failed delete team from favourite', classes: 'rounded'});
  })
}

export default {
  addToFavourite,
  getAll,
  getById,
  deleteFavourite
};