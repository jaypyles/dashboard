# STL
import logging

# PDM
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.backend.systems.runner import MachineRunner


LOG = logging.getLogger(__name__)

app = FastAPI(title="api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/endpoint")
async def test_endpoint():
    machine_runner = MachineRunner()
    machine_runner.read_config("./configs/self.yml")
    return "Hello World!"
