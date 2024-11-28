# PDM
import qbittorrentapi

# LOCAL
from api.backend.integrations.integration import INTEGRATIONS

qbittorrent_integration = next(
    (integration for integration in INTEGRATIONS if integration.name == "qbittorrent"),
    None,
)


def get_client_info():
    assert qbittorrent_integration is not None

    connection_info = {
        "host": qbittorrent_integration.config["url"],
        "username": qbittorrent_integration.config["user"],
        "password": qbittorrent_integration.config["password"],
    }

    return connection_info


def get_transfer_info():
    connection_info = get_client_info()
    qbt_client = qbittorrentapi.Client(
        **connection_info  # pyright: ignore[reportArgumentType]
    )
    qbt_client.auth_log_in()
    return qbt_client.transfer_info()
