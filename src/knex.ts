import Knex from 'knex';
import * as path from 'path';

let knex: any;

export const getDb = (config: any) => {
  if (!knex) {
    knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: path.join(config.dataDir, `jastore.data`),
      },
    });
  }

  return knex;
}

export const saveNamespace = async (namespace: any) => {
  if (!knex) { throw 'database not initialized' }
  // const db = 
}