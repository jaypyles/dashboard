# STL
import logging
from typing_extensions import TypedDict


# PDM
from fastapi import APIRouter

# LOCAL
from api.backend.constants import KUMA_SITES
from api.backend.integrations import (
    INTEGRATIONS,
    get_shows,
    get_movies,
    get_uptime,
    get_jellyfin_data,
    get_transfer_info,
    get_argocd_data,
)

LOG = logging.getLogger(__name__)

integration_router = APIRouter()


class Integration(TypedDict):
    name: str
    url: str


@integration_router.get("/api/integrations")
async def get_integrations() -> list[Integration]:
    integrations = []

    for integration in INTEGRATIONS:
        url = integration.config["url"]
        if integration.config.get("display_url"):
            url = integration.config["display_url"]

        integrations.append(Integration(name=integration.name, url=url))

    return integrations


@integration_router.get("/api/integrations/uptime")
async def get_site_uptime():
    return {val: get_uptime(key) for key, val in KUMA_SITES.items()}


@integration_router.get("/api/integrations/transfer_info")
async def get_qb_transfer_info():
    return get_transfer_info()


@integration_router.get("/api/integrations/jellyfin/media_count")
async def get_jellyfin_media_count():
    return await get_jellyfin_data()


@integration_router.get("/api/integrations/radarr/movies")
async def get_radarr_movie_count():
    return await get_movies()


@integration_router.get("/api/integrations/sonarr/shows")
async def get_sonarr_show_count():
    return await get_shows()


@integration_router.get("/api/integrations/argocd/applications")
def get_argocd_applications():
    return get_argocd_data()
