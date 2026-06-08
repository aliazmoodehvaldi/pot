import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'PotVault';
const STORE_NAME = 'passwords';
const DB_VERSION = 1;

export interface VaultEntry {
  id: string;
  data: string; // Encrypted JSON string
}

export class StorageDB {
  private db: IDBPDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  async init(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        this.db = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
          },
        });
      } catch (err) {
        this.initPromise = null; // Allow retry
        throw err;
      }
    })();

    return this.initPromise;
  }

  async getAll(): Promise<VaultEntry[]> {
    if (!this.db) return [];
    return this.db.getAll(STORE_NAME);
  }

  async save(entry: VaultEntry): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    await this.db.put(STORE_NAME, entry);
  }

  async delete(id: string): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    await this.db.delete(STORE_NAME, id);
  }

  async saveAll(entries: VaultEntry[]): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.clear();
    for (const entry of entries) {
      await store.add(entry);
    }
    await tx.done;
  }

  async clear(): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    await this.db.clear(STORE_NAME);
  }
}

export const db = new StorageDB();
