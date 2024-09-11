# STL
from typing import Any, Optional

# PDM
import aiohttp


async def fetch(url: str, headers: Optional[dict[str, Any]] = None):
    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.get(url) as response:
            return await response.json()
