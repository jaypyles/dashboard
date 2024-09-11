# STL
import os
from typing import Any

# PDM
import aiohttp


async def fetch(url: str, headers: dict[str, Any]):
    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.get(url) as response:
            return await response.json()


async def call_jellyfin_api(jellyfin_api_key: str, jellyfin_url: str, endpoint: str):
    return await fetch(
        f"{jellyfin_url}/{endpoint}", headers={"X-Emby-Token": jellyfin_api_key}
    )


async def get_sessions(jellyfin_api_key: str, jellyfin_url: str) -> dict[str, Any]:
    return await call_jellyfin_api(jellyfin_api_key, jellyfin_url, "Sessions")


async def get_counts(jellyfin_api_key: str, jellyfin_url: str) -> dict[str, Any]:
    counts = await call_jellyfin_api(jellyfin_api_key, jellyfin_url, "Items/Counts")
    print(counts)
    return counts


async def get_jellyfin_data():
    counts = await get_counts(
        os.environ["NEXT_PUBLIC_JELLYFIN_API_KEY"],
        os.environ["NEXT_PUBLIC_JELLYFIN_URL"],
    )

    return counts
