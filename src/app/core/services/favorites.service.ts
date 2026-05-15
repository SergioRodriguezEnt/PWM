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
    await this.db.run(
      'CREATE TABLE IF NOT EXISTS favorites (outfitId TEXT PRIMARY KEY)',
      [],
      true
    );
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
    await this.db.run(
      'INSERT OR IGNORE INTO favorites (outfitId) VALUES (?)',
      [outfitId],
      true
    );
  }

  async removeFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    await this.db.run(
      'DELETE FROM favorites WHERE outfitId = ?',
      [outfitId],
      true
    );
  }
}
