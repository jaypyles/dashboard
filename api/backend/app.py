# STL
import logging

# PDM
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.backend.systems.host import Host
from fastapi.responses import JSONResponse

from api.backend.systems.command import CommandNotFoundError

from api.backend.models import BuildConfigFile
import api.backend.configs.commands as yaml_utils


LOG = logging.getLogger(__name__)

app = FastAPI(title="api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

config_files = ["./configs/self.yml", "./configs/fred.yml", "./configs/optimus.yml"]
hosts = [Host(f) for f in config_files]
HOST_MAP = {host.name: host for host in hosts}


@app.get("/api/hosts")
async def get_hosts():
    return list(HOST_MAP.keys())


@app.get("/api/{host_name}/commands")
async def get_host_commands(host_name: str):
    host = HOST_MAP[host_name]
    return list(host.runner.commands.values())


@app.get("/api/{host_name}/command/{command_name}")
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


@app.post("/api/config")
async def create_config(build_config: BuildConfigFile):
    try:
        yaml_utils.create_config_file(build_config.filename, build_config.config)
        return JSONResponse({"message": "Config successfully created."})
    except Exception as e:
        return JSONResponse(
            {"message": f"Config could not be created: {e}"}, status_code=500
        )


@app.get("/api/{host_name}/stats")
async def get_stats(host_name: str):
    host = HOST_MAP[host_name]
    try:
        storage = "".join(host.runner.dispatch("storage")[0])
        usage = "".join(host.runner.dispatch("cpu_usage")[0])
        cores = "".join(host.runner.dispatch("cpu_cores")[0])
        threads = "".join(host.runner.dispatch("cpu_threads")[0])
        uptime = "".join(host.runner.dispatch("uptime")[0])

        return JSONResponse(
            {
                "storage": storage,
                "usage": usage,
                "cores": cores,
                "threads": threads,
                "uptime": uptime,
            }
        )
    except Exception:
        return JSONResponse(
            {"message": "Gathering stats had a problem."}, status_code=500
        )
