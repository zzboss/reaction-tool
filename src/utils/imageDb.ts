// IndexedDB utility for image storage
const DB_NAME = 'ImageProcessingDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening database:', event);
      reject('Could not open database');
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = database.createObjectStore(STORE_NAME, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        
        objectStore.createIndex('name', 'name', { unique: false });
      }
    };
  });
};

export const saveImage = (dataUrl: string, name: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDatabase();
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.add({ data: dataUrl, name, timestamp: Date.now() });
      
      request.onsuccess = () => {
        resolve(request.result as number);
      };
      
      request.onerror = () => {
        reject('Error saving image');
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllImages = (): Promise<{ id: number; data: string; name: string }[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDatabase();
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject('Error retrieving images');
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteImage = (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDatabase();
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject('Error deleting image');
      };
    } catch (error) {
      reject(error);
    }
  });
};