# STL
import logging
import traceback

# PDM
from fastapi import Request, APIRouter
from fastapi.responses import JSONResponse

# LOCAL
from api.backend.host_manager import HOST_MAP
from api.backend.database.database_functions import delete_job

from api.backend.command_queue import COMMAND_QUEUE

LOG = logging.getLogger(__name__)

host_router = APIRouter()


@host_router.get("/api/{host_name}/refresh")
async def refresh_host(host_name: str):
    HOST_MAP[host_name].refresh()
    return JSONResponse({"message": "Successfully refreshed."})


@host_router.get("/api/hosts")
async def get_hosts():
    return list(HOST_MAP.keys())


@host_router.get("/api/{host_name}/commands")
async def get_host_commands(_: Request, host_name: str):
    host = HOST_MAP[host_name]
    return list(host.runner.commands.values())


@host_router.delete("/api/{host_name}/job/{id}")
async def delete_single_job(id: str):
    _ = COMMAND_QUEUE.delete(id)
    return JSONResponse({"status": "success", "reason": "Job successfully deleted."})


@host_router.get("/api/{host_name}/stats")
async def get_stats(host_name: str):
    host = HOST_MAP[host_name]
    try:
        storage = "".join(host.runner.dispatch("storage")[0])
        usage = "".join(host.runner.dispatch("cpu_usage")[0])
        cores = "".join(host.runner.dispatch("cpu_cores")[0])
        threads = "".join(host.runner.dispatch("cpu_threads")[0])
        uptime = "".join(host.runner.dispatch("uptime")[0])
        ram_usage = "".join(host.runner.dispatch("ram_usage")[0])

        return JSONResponse(
            {
                "storage": storage,
                "usage": usage,
                "cores": cores,
                "threads": threads,
                "uptime": uptime,
                "ram_usage": ram_usage,
            }
        )
    except Exception:
        traceback.print_exc()
        return JSONResponse(
            {"message": "Gathering stats had a problem."}, status_code=500
        )
