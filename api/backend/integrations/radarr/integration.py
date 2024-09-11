# STL
import os

# LOCAL
from api.backend.utils import fetch


async def get_movies():
    res = await fetch(
        f'{os.environ["NEXT_PUBLIC_RADARR_URL"]}/api/v3/movie?apiKey={os.environ["RADARR_KEY"]}'
    )

    return {"movies": res}
