# STL
import logging
from typing import Any
from datetime import datetime

# PDM
from fastapi import APIRouter
from fastapi.responses import JSONResponse

# LOCAL
from api.backend.models import Job, CommandChain
from api.backend.host_manager import HOST_MAP
from api.backend.systems.command import CommandNotFoundError
from api.backend.database.database_functions import insert_job, retrieve_jobs

LOG = logging.getLogger(__name__)

command_router = APIRouter()


@command_router.get("/api/{host_name}/command/command-queue")
async def get_queue(host_name: str):
    return await retrieve_jobs(host_name)


@command_router.get("/api/{host_name}/command/{command_name}")
async def dispatch_command(host_name: str, command_name: str):
    host = HOST_MAP[host_name]
    command = host.runner.commands[command_name]

    job = Job(
        host=host_name,
        commands=[command.to_dict()],
        time_created=datetime.now(),
        status="queued",
        output=None,
    )

    await insert_job(job)


@command_router.get("/api/{host_name}/run-command/{command_name}")
async def count_containers(host_name: str):
    host = HOST_MAP[host_name]
    output = host.runner.dispatch("count-containers")
    return JSONResponse(output)


@command_router.post("/api/{host_name}/command-chain")
async def command_chain(command_chain: CommandChain, host_name: str):
    host = HOST_MAP[host_name]
    response: dict[str, Any] = {}

    for command in command_chain.commands:
        try:
            stdout, stderr = host.runner.dispatch(command)
            response[command] = {"stdout": stdout, "stderr": stderr}

        except CommandNotFoundError:
            response.update(
                {
                    command: {
                        "stdout": "",
                        "stderr": "",
                        "message": "Failed to find command.",
                    }
                }
            )
            return JSONResponse(response, status_code=400)

    return JSONResponse(response)
