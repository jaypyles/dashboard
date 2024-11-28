# LOCAL
from api.backend.utils import fetch
from api.backend.integrations.integration import INTEGRATIONS

sonarr_integration = next(
    (integration for integration in INTEGRATIONS if integration.name == "sonarr"),
    None,
)


def get_client_info():
    assert sonarr_integration is not None

    return {
        "host": sonarr_integration.config["url"],
        "api_key": sonarr_integration.config["api_key"],
    }


async def get_shows():
    client_info = get_client_info()

    res = await fetch(
        f"{client_info['host']}/api/v3/series?apikey={client_info['api_key']}"
    )

    return res
