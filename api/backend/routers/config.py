# STL
import logging

# PDM
from fastapi import APIRouter
from fastapi.responses import JSONResponse

# LOCAL
import api.backend.configs.commands as yaml_utils
from api.backend.models import AddCommand, BuildConfigFile
from api.backend.host_manager import HOST_MAP

LOG = logging.getLogger(__name__)

config_router = APIRouter()


@config_router.post("/api/config")
async def create_config(build_config: BuildConfigFile):
    try:
        yaml_utils.create_config_file(build_config.filename, build_config.config)
        return JSONResponse({"message": "Config successfully created."})
    except Exception as e:
        return JSONResponse(
            {"message": f"Config could not be created: {e}"}, status_code=500
        )


@config_router.get("/api/config/{host_name}")
async def get_config(host_name: str):
    return JSONResponse(yaml_utils.get_config_file_for_read(host_name).model_dump())


@config_router.post("/api/config/{host_name}/add-command")
async def add_command(add_command: AddCommand, host_name: str):
    res = yaml_utils.add_command_to_config(host_name, add_command.command)

    if res["status"] == "failure":
        return JSONResponse(status_code=500, content=res)

    host = HOST_MAP[host_name]
    host.refresh()

    return JSONResponse(res)


@config_router.post("/api/config/{host_name}/delete-command")
async def remove_command(add_command: AddCommand, host_name: str):
    res = yaml_utils.remove_command_from_config(host_name, add_command.command)
    host = HOST_MAP[host_name]
    print(res)

    if res["status"] == "failure":
        return JSONResponse(status_code=500, content=res)

    _ = host.runner.commands.pop(add_command.command.name)
    return JSONResponse(res)