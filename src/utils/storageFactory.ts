export const StorageFactory = {
    localStorage: {
        set: (key: string, value: any) => {
            localStorage.setItem(key, JSON.stringify(value));
            console.log(`[StorageFactory] LocalStorage set: ${key}`);
        },
        get: (key: string) => {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        clear: () => {
            localStorage.clear();
            console.log(`[StorageFactory] LocalStorage cleared`);
        }
    },

    sessionStorage: {
        set: (key: string, value: any) => {
            sessionStorage.setItem(key, JSON.stringify(value));
            console.log(`[StorageFactory] SessionStorage set: ${key}`);
        },
        get: (key: string) => {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        clear: () => {
            sessionStorage.clear();
            console.log(`[StorageFactory] SessionStorage cleared`);
        }
    },

    indexedDB: {
        initDB: (dbName: string, storeName: string) => {
            return new Promise<IDBDatabase>((resolve, reject) => {
                const request = indexedDB.open(dbName, 1);
                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: 'id' });
                    }
                };
                request.onsuccess = (event) => {
                    resolve((event.target as IDBOpenDBRequest).result);
                };
                request.onerror = (event) => {
                    reject((event.target as IDBOpenDBRequest).error);
                };
            });
        },
        add: async (dbName: string, storeName: string, data: any) => {
            try {
                const request = indexedDB.open(dbName, 1);
                request.onsuccess = (e) => {
                    const db = (e.target as IDBOpenDBRequest).result;
                    const transaction = db.transaction([storeName], 'readwrite');
                    const store = transaction.objectStore(storeName);
                    store.put(data);
                }
                request.onupgradeneeded = (e) => {
                    const db = (e.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: 'id' });
                    }
                }
            } catch (e) {
                console.error("IndexedDB Error", e);
            }
        },
        clear: (dbName: string) => {
            const req = indexedDB.deleteDatabase(dbName);
            req.onsuccess = () => {
                console.log("Deleted database successfully");
            };
            req.onerror = () => {
                console.log("Couldn't delete database");
            };
        }
    }
};
