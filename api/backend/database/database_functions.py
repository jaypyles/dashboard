# STL
import uuid
import json
from typing import Any, Union, Literal, Optional
import sqlite3

# PDM
from fastapi.responses import JSONResponse

# LOCAL
from api.backend.models import Job
from api.backend.database.startup import DATABASE_PATH


async def get_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


async def insert_job(job: Job):
    connection = await get_connection()
    dict_job = dict(job)
    dict_job.update(
        {
            "id": uuid.uuid4().hex,
            "commands": [dict(command) for command in dict_job["commands"]],
        }
    )
    cursor = connection.cursor()
    _ = cursor.execute(
        "INSERT INTO jobs (id, host, status, time_created, commands, output) VALUES (?, ?, ?, ?, ?, ?)",
        (
            dict_job["id"],
            dict_job["host"],
            dict_job["status"],
            dict_job["time_created"],
            json.dumps(dict_job["commands"]),
            json.dumps(dict_job["output"]),
        ),
    )
    connection.commit()
    connection.close()


async def get_queued_job():
    connection = await get_connection()
    cursor = connection.cursor()
    _ = cursor.execute(
        "SELECT * FROM jobs WHERE status = 'queued' ORDER BY time_created ASC LIMIT 1"
    )

    job = cursor.fetchone()

    connection.commit()
    connection.close()

    if job is None:
        return None

    return {
        "id": job[0],
        "host": job[1],
        "status": job[2],
        "time_created": job[3],
        "commands": json.loads(job[4]),
        "output": json.loads(job[5]),
    }


async def update_job_status(
    id: str,
    status: Union[Literal["queued"], Literal["done"], Literal["running"]],
):
    connection = await get_connection()
    cursor = connection.cursor()
    _ = cursor.execute("UPDATE jobs SET status = ? WHERE id = ?", (status, id))
    connection.commit()
    connection.close()


async def update_job(
    id: str,
    command_name: str,
    output: Optional[dict[str, Any]] = None,
):
    connection = await get_connection()
    cursor = connection.cursor()
    new_output = {}

    commands = json.loads(
        cursor.execute("SELECT commands FROM jobs WHERE id = ?", (id,)).fetchone()[0]
    )

    if output is None:
        output = {"stdout": "", "stderr": ""}

    for command in commands:
        if command["name"] == command_name:
            new_output[command_name] = output

    _ = cursor.execute(
        f"UPDATE jobs SET output = ? WHERE id = ?",
        (json.dumps(new_output), id),
    )

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:
        raise Exception(f"Job with id {id} was not updated.")

    return {"status": "success"}


async def retrieve_jobs(host: str):
    connection = await get_connection()
    cursor = connection.cursor()
    _ = cursor.execute("SELECT * FROM jobs WHERE host = ?", (host,))
    jobs = cursor.fetchall()

    connection.close()

    jobs_as_dicts = [
        {
            "id": job[0],
            "host": job[1],
            "status": job[2],
            "time_created": job[3],
            "commands": json.loads(job[4]),
            "output": json.loads(job[5]),
        }
        for job in jobs
    ]

    return JSONResponse(content={"jobs": jobs_as_dicts})


async def delete_job(id: str):
    connection = await get_connection()
    cursor = connection.cursor()
    print(f"Deleting job with id: {id}")
    _ = cursor.execute("DELETE FROM jobs WHERE id = ?", (id,))
    connection.commit()
    connection.close()
