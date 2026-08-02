import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

type VisitorDatabaseGlobal = typeof globalThis & {
  visitorDatabase?: DatabaseSync;
};

const globalDatabase = globalThis as VisitorDatabaseGlobal;
const INITIAL_VISITOR_COUNT = 1_477_314;

function createDatabase() {
  const databasePath = process.env.VISITOR_DB_PATH
    ? path.resolve(process.env.VISITOR_DB_PATH)
    : path.join(process.cwd(), ".data", "visitors.sqlite");

  mkdirSync(path.dirname(databasePath), { recursive: true });

  const database = new DatabaseSync(databasePath);
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;

    CREATE TABLE IF NOT EXISTS visitor_counter (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      total INTEGER NOT NULL DEFAULT ${INITIAL_VISITOR_COUNT}
    );

    INSERT OR IGNORE INTO visitor_counter (id, total)
      VALUES (1, ${INITIAL_VISITOR_COUNT});

    CREATE TABLE IF NOT EXISTS processed_page_loads (
      request_id TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS processed_page_loads_created_at
      ON processed_page_loads (created_at);
  `);

  return database;
}

function getDatabase() {
  if (!globalDatabase.visitorDatabase) {
    globalDatabase.visitorDatabase = createDatabase();
  }

  return globalDatabase.visitorDatabase;
}

export function getVisitorCount() {
  const row = getDatabase()
    .prepare("SELECT total FROM visitor_counter WHERE id = 1")
    .get() as { total: number };

  return Number(row.total);
}

export function registerPageLoad(requestId: string) {
  const database = getDatabase();
  const now = Date.now();

  database.exec("BEGIN IMMEDIATE");

  try {
    const result = database
      .prepare(
        "INSERT OR IGNORE INTO processed_page_loads (request_id, created_at) VALUES (?, ?)",
      )
      .run(requestId, now);

    if (Number(result.changes) === 1) {
      database.exec(
        "UPDATE visitor_counter SET total = total + 1 WHERE id = 1",
      );
    }

    // These IDs are only needed briefly to prevent React development remounts
    // from counting the same browser page load twice.
    database
      .prepare("DELETE FROM processed_page_loads WHERE created_at < ?")
      .run(now - 24 * 60 * 60 * 1000);

    const total = getVisitorCount();
    database.exec("COMMIT");
    return total;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}
