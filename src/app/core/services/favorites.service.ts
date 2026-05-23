// favorites.service.ts
import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private initPromise: Promise<void> | null = null;

  private ensureInit(): Promise<void> {
    return (this.initPromise ??= this.doInit());
  }

  private isOpen = false;

  private async doInit(): Promise<void> {
    try {
      const isConsistent = (await this.sqlite.checkConnectionsConsistency()).result;
      const isConn = (await this.sqlite.isConnection('outfitera_db', false)).result;

      this.db = (isConsistent && isConn)
        ? await this.sqlite.retrieveConnection('outfitera_db', false)
        : await this.sqlite.createConnection('outfitera_db', false, 'no-encryption', 1, false);

      // Verificar que no está ya abierta antes de abrir
      const isDBOpen = (await this.sqlite.isDBOpen('outfitera_db')).result;
      if (!isDBOpen) {
        await this.db.open();
      }
      this.isOpen = true;

      await this.db.execute(
        'CREATE TABLE IF NOT EXISTS favorites (outfitId TEXT PRIMARY KEY);'
      );
      console.log('[FavoritesService] SQLite init OK');
    } catch (e) {
      this.initPromise = null;
      console.error('[FavoritesService] Init error:', e);
      throw e;
    }
  }

  async getFavoriteIds(): Promise<string[]> {
    await this.ensureInit();
    const result = await this.db.query('SELECT outfitId FROM favorites;');
    return result.values?.map((r: any) => r['outfitId']) ?? [];
  }

  async isFavorite(outfitId: string): Promise<boolean> {
    await this.ensureInit();
    const result = await this.db.query(
      'SELECT outfitId FROM favorites WHERE outfitId = ?;', [outfitId]
    );
    return (result.values?.length ?? 0) > 0;
  }

  async addFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    // run() SÍ funciona bien para INSERT con un único statement
    await this.db.run(
      'INSERT OR IGNORE INTO favorites (outfitId) VALUES (?);',
      [outfitId]
    );
  }

  async removeFavorite(outfitId: string): Promise<void> {
    await this.ensureInit();
    // Para DELETE, usar execute() con el valor interpolado de forma segura
    // o el workaround de transacción manual
    await this.db.beginTransaction();
    try {
      await this.db.run('DELETE FROM favorites WHERE outfitId = ?;', [outfitId], false);
      await this.db.commitTransaction();
    } catch (e) {
      await this.db.rollbackTransaction();
      throw e;
    }
  }

  async init(): Promise<void> {
    return this.ensureInit();
  }
}
