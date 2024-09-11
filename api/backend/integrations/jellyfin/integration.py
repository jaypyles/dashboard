# STL
import os
from typing import Any

# LOCAL
from api.backend.utils import fetch


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
    counts = await get_counts(
        os.environ["NEXT_PUBLIC_JELLYFIN_API_KEY"],
        os.environ["NEXT_PUBLIC_JELLYFIN_URL"],
    )

    return counts
