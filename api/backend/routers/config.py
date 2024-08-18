# STL
import logging

# PDM
from fastapi import APIRouter
from fastapi.responses import JSONResponse

# LOCAL
import api.backend.configs.commands as yaml_utils
from api.backend.models import BuildConfigFile

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
