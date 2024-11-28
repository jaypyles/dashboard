# LOCAL
from api.backend.utils import fetch
from api.backend.integrations.integration import INTEGRATIONS

radarr_integration = next(
    (integration for integration in INTEGRATIONS if integration.name == "radarr"),
    None,
)


def get_client_info():
    assert radarr_integration is not None

    return {
        "host": radarr_integration.config["url"],
        "api_key": radarr_integration.config["api_key"],
    }


async def get_movies():
    client_info = get_client_info()

    res = await fetch(
        f"{client_info['host']}/api/v3/movie?apiKey={client_info['api_key']}"
    )

    return {"movies": res}
