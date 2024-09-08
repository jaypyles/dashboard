# STL
import os
from typing import Any

# PDM
from uptime_kuma_api import UptimeKumaApi


def get_api():
    api = UptimeKumaApi(os.environ["UPTIME_KUMA_URL"])
    _ = api.login(os.environ["UPTIME_KUMA_USERNAME"], os.environ["UPTIME_KUMA_PASSWORD"])
    return api


def get_uptime(uptime_id: int) -> dict[str, Any]:
    api = get_api()
    monitor = api.get_monitor_beats(uptime_id, 1)[0]

    status = {"ping": monitor["ping"], "msg": monitor["msg"]}

    api.disconnect()
    return status
