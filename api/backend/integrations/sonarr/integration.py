# STL
import os

# LOCAL
from api.backend.utils import fetch


async def get_shows():
    res = await fetch(
        f'{os.environ["NEXT_PUBLIC_SONARR_URL"]}/api/v3/series?apikey={os.environ["SONARR_KEY"]}'
    )

    return res
