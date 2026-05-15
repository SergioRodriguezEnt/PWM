import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private initPromise: Promise<void> | null = null;

  async init(): Promise<void> {
    return this.ensureInit();
  }

  private ensureInit(): Promise<void> {
    return (this.initPromise ??= this.doInit());
  }

  private async doInit(): Promise<void> {
    const isConsistent = (await this.sqlite.checkConnectionsConsistency()).result;
    const isConn = (await this.sqlite.isConnection('outfitera_db', false)).result;

    this.db = (isConsistent && isConn)
      ? await this.sqlite.retrieveConnection('outfitera_db', false)
      : await this.sqlite.createConnection('outfitera_db', false, 'no-encryption', 1, false);

    await this.db.open();
    await this.execWrite(
      'CREATE TABLE IF NOT EXISTS favorites (outfitId TEXT PRIMARY KEY)',
      []
    );
  }

  // run() with transaction:true has a bug on Android: commitTransaction() is
  // only called when lastId != -1 (i.e. only after INSERT with a new rowid).
  // DDL (CREATE TABLE) and DELETE always get rolled back. Fix: manage the
  // transaction manually so the commit is unconditional.
  private async execWrite(statement: string, values: unknown[]): Promise<void> {
    await this.db.beginTransaction();
    try {
      await this.db.run(statement, values as any[], false);
      await this.db.commitTransaction();
    } catch (e) {
      await this.db.rollbackTransaction();
      throw e;
    }
  }

  async getFavoriteIds(): Promise<string[]> {
    await this.ensureInit();
    const result = await this.db.query('SELECT outfitId FROM favorites');
    return result.values?.map(r => r.outfitId) ?? [];
  }

  async isFavorite(outfitId: string): Promise<boolean> {
    await this.ensureInit();
    const result = await this.db.query(
      'SELECT outfitId FROM favorites WHERE outfitId = ?', [outfitId]
    );
    return (result.values?.length ?? 0) > 0;
  }

  async addFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    await this.execWrite(
      'INSERT OR IGNORE INTO favorites (outfitId) VALUES (?)',
      [outfitId]
    );
  }

  async removeFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    await this.execWrite(
      'DELETE FROM favorites WHERE outfitId = ?',
      [outfitId]
    );
  }
}
