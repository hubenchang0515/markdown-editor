const DB_NAME = 'fileDB';
const STORE_NAME = 'files';

interface FileItem {
    id: string;
    name: string;
    file: Blob;
}

// 基础版本
async function sha256(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function openDB():Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);

        req.onupgradeneeded = () => {
            const db = req.result;
            db.createObjectStore(STORE_NAME, {
                keyPath: 'id',
            });
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function saveFile(file:File) {
    return new Promise((resolve) => {
        openDB().then((db) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            sha256(file).then(id => {
                const data:FileItem = {
                    id: id ,
                    name: file.name,
                    file: file,
                };

                const req = store.put(data);
                req.onsuccess = () => {
                    resolve(req.result);
                }
            });
        });
    });
}

// TODO：将插入的图片存入 IndexedDB，并生成持久性的 URL