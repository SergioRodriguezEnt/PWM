import { Injectable, inject } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private authService = inject(AuthService);
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

    const verResult = await this.db.query('PRAGMA user_version');
    const version = verResult.values?.[0]?.user_version ?? 0;
    if (version < 2) {
      await this.db.execute(`
        DROP TABLE IF EXISTS favorites;
        CREATE TABLE favorites (
          userId TEXT NOT NULL,
          outfitId TEXT NOT NULL,
          PRIMARY KEY (userId, outfitId)
        );
        PRAGMA user_version = 2;
      `);
    }
  }

  async getFavoriteIds(): Promise<string[]> {
    await this.ensureInit();
    const uid = this.authService.userId();
    if (!uid) return [];
    const result = await this.db.query(
      'SELECT outfitId FROM favorites WHERE userId = ?',
      [uid]
    );
    return result.values?.map(r => r.outfitId) ?? [];
  }

  async isFavorite(outfitId: string): Promise<boolean> {
    await this.ensureInit();
    const uid = this.authService.userId();
    if (!uid) return false;
    const result = await this.db.query(
      'SELECT outfitId FROM favorites WHERE userId = ? AND outfitId = ?',
      [uid, outfitId]
    );
    return (result.values?.length ?? 0) > 0;
  }

  async addFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    const uid = this.authService.userId();
    if (!uid) return;
    await this.db.run(
      'INSERT OR IGNORE INTO favorites (userId, outfitId) VALUES (?, ?)',
      [uid, outfitId]
    );
  }

  async removeFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    const uid = this.authService.userId();
    if (!uid) return;
    await this.db.run(
      'DELETE FROM favorites WHERE userId = ? AND outfitId = ?',
      [uid, outfitId]
    );
  }
}
