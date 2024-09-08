# STL
import logging

# PDM
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# LOCAL
from api.backend.routers.host import host_router
from api.backend.routers.config import config_router
from api.backend.routers.command import command_router
from api.backend.routers.integration import integration_router

LOG = logging.getLogger(__name__)

app = FastAPI(title="api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(host_router)
app.include_router(config_router)
app.include_router(command_router)
app.include_router(integration_router)
