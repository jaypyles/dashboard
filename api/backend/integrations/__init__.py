# LOCAL
from .radarr import get_movies
from .sonarr import get_shows
from .jellyfin import get_jellyfin_data
from .integration import INTEGRATIONS
from .qbittorrent import get_transfer_info
from .uptime_kuma import get_uptime
from .argocd import get_argocd_data

__all__ = [
    "INTEGRATIONS",
    "get_uptime",
    "get_transfer_info",
    "get_jellyfin_data",
    "get_movies",
    "get_shows",
    "get_argocd_data",
]
