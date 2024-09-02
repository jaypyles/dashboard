# STL
import asyncio

# LOCAL
from api.backend.host_manager import HOST_MAP
from api.backend.database.database_functions import (
    update_job,
    get_queued_job,
    update_job_status,
)


async def main():
    while True:
        job = await get_queued_job()

        if job:
            host = HOST_MAP[job["host"]]
            await update_job_status(job["id"], "running")
            for command in job["commands"]:
                print("running")
                stdout, stderr = host.runner.dispatch(command["name"])
                await update_job_status(job["id"], "done")
                _ = await update_job(
                    job["id"],
                    command["name"],
                    {"stdout": stdout, "stderr": stderr},
                )

            print("restarting loop")
            await asyncio.sleep(5)


if __name__ == "__main__":
    asyncio.run(main())
