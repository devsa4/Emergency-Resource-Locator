const RESOURCE_DB_NAME="aapadasetu-offline-cache";
const RESOURCE_STORE_NAME="resources";

function openResourceDb(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(RESOURCE_DB_NAME,1);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(RESOURCE_STORE_NAME)) db.createObjectStore(RESOURCE_STORE_NAME);
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
function idbGet(key){
  return openResourceDb().then(db=>new Promise((resolve,reject)=>{
    const tx=db.transaction(RESOURCE_STORE_NAME,"readonly");
    const store=tx.objectStore(RESOURCE_STORE_NAME);
    const req=store.get(key);
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
    tx.onerror=()=>reject(tx.error);
  }));
}
function idbSet(key,value){
  return openResourceDb().then(db=>new Promise((resolve,reject)=>{
    const tx=db.transaction(RESOURCE_STORE_NAME,"readwrite");
    tx.objectStore(RESOURCE_STORE_NAME).put(value,key);
    tx.oncomplete=()=>{db.close();resolve(true);};
    tx.onerror=()=>reject(tx.error);
  }));
}

export { openResourceDb, idbGet, idbSet };
