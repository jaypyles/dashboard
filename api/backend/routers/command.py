# STL
import logging
from typing import Any

# PDM
from fastapi import APIRouter
from fastapi.responses import JSONResponse

# LOCAL
from api.backend.models import CommandChain
from api.backend.host_manager import HOST_MAP
from api.backend.systems.command import CommandNotFoundError

LOG = logging.getLogger(__name__)

command_router = APIRouter()


@command_router.get("/api/{host_name}/command/{command_name}")
async def run_command(host_name: str, command_name: str):
    host = HOST_MAP[host_name]
    print(f"Commands for runner: {host.runner.commands}")

    try:
        out, err = host.runner.dispatch(command_name)
        return JSONResponse(
            {
                "stdout": "".join(out),
                "stderr": "".join(err),
            }
        )
    except CommandNotFoundError:
        return JSONResponse({"message": "Command not found."}, status_code=404)


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
