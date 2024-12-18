import sqlite3
import os

DATA_FOLDER = "./data"
DATABASE_PATH = f"{DATA_FOLDER}/jobs.db"


def create_database():
    os.makedirs(DATA_FOLDER, exist_ok=True)
    conn = sqlite3.connect(DATABASE_PATH)
    create_tables(conn)
    conn.close()


def create_tables(conn: sqlite3.Connection):
    cursor = conn.cursor()
    _ = cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS jobs (
            id TEXT PRIMARY KEY,
            host TEXT,
            status TEXT,
            time_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            commands JSON,
            output JSON
        )
    """
    )
    conn.commit()
