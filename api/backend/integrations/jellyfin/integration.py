# STL
from typing import Any

# LOCAL
from api.backend.utils import fetch
from api.backend.integrations.integration import INTEGRATIONS

jellyfin_integration = next(
    (integration for integration in INTEGRATIONS if integration.name == "jellyfin"),
    None,
)


async def call_jellyfin_api(jellyfin_api_key: str, jellyfin_url: str, endpoint: str):
    return await fetch(
        f"{jellyfin_url}/{endpoint}", headers={"X-Emby-Token": jellyfin_api_key}
    )


async def get_sessions(jellyfin_api_key: str, jellyfin_url: str) -> dict[str, Any]:
    return await call_jellyfin_api(jellyfin_api_key, jellyfin_url, "Sessions")


async def get_counts(jellyfin_api_key: str, jellyfin_url: str) -> dict[str, Any]:
    counts = await call_jellyfin_api(jellyfin_api_key, jellyfin_url, "Items/Counts")
    return counts


async def get_jellyfin_data():
    assert jellyfin_integration is not None

    counts = await get_counts(
        jellyfin_integration.config["api_key"],
        jellyfin_integration.config["url"],
    )

    return counts
