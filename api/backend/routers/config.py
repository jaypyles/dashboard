# PDM
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse

# LOCAL
import api.backend.configs.commands as yaml_utils
from api.backend.configs import utils as config_utils
from api.backend.models import AddCommand, BuildConfigFile
from api.backend.host_manager import HOST_MAP
from api.backend.logging import LOG

from api.backend.configs.models import AppConfig

config_router = APIRouter()


@config_router.get("/api/app-config")
async def get_app_config():
    config = yaml_utils.read_yaml_file("./configs/app-config/app-config.yml")
    app_config = AppConfig(files_url=config["files_url"])

    return JSONResponse(app_config.model_dump())


@config_router.post("/api/config")
async def create_config(build_config: BuildConfigFile):
    try:
        yaml_utils.create_config_file(build_config.filename, build_config.config)
        return JSONResponse({"message": "Config successfully created."})
    except Exception as e:
        return JSONResponse(
            {"message": f"Config could not be created: {e}"}, status_code=500
        )


@config_router.get("/api/config/background")
async def get_background():
    try:
        LOG.info(f"Background path: {config_utils.BACKGROUND_PATH}")
        return FileResponse(config_utils.BACKGROUND_PATH)
    except Exception as e:
        return JSONResponse(
            {"message": f"Background could not be uploaded: {e}"}, status_code=500
        )


@config_router.post("/api/config/background")
async def upload_background(
    file: UploadFile = File(...),
):
    try:
        LOG.info(f"Form: {file}")
        config_utils.upload_background(file)
        return File({"message": "Background successfully uploaded."})
    except Exception as e:
        return JSONResponse(
            {"message": f"Background could not be uploaded: {e}"}, status_code=500
        )


@config_router.get("/api/config/{host_name}")
async def get_config(host_name: str):
    try:
        return JSONResponse(yaml_utils.get_config_file_for_read(host_name).model_dump())
    except Exception as e:
        return JSONResponse(
            {"message": f"Config could not be retrieved: {e}"}, status_code=500
        )


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

    if res["status"] == "failure":
        return JSONResponse(status_code=500, content=res)

    _ = host.runner.commands.pop(add_command.command.name)
    return JSONResponse(res)
