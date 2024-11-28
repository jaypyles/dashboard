from typing import Any

# PDM
from uptime_kuma_api import UptimeKumaApi

from api.backend.integrations.integration import INTEGRATIONS

kuma_integration = next(
    (integration for integration in INTEGRATIONS if integration.name == "kuma"),
    None,
)

def get_api():
    assert kuma_integration is not None

    api = UptimeKumaApi(kuma_integration.config["url"])
    _ = api.login(
        kuma_integration.config["username"], kuma_integration.config["password"]
    )
    return api


def get_uptime(uptime_id: int) -> dict[str, Any]:
    api = get_api()
    monitor = api.get_monitor_beats(uptime_id, 1)[0]

    status = {"ping": monitor["ping"], "msg": monitor["msg"]}

    api.disconnect()
    return status
