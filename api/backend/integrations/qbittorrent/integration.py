import os
import qbittorrentapi

connection_info = {
    "host": os.environ["NEXT_PUBLIC_QB_URL"],
    "username": os.environ["QB_USER"],
    "password": os.environ["QB_PASS"]
}

def get_transfer_info():
    qbt_client = qbittorrentapi.Client(**connection_info) #pyright: ignore[reportArgumentType]
    qbt_client.auth_log_in()
    return qbt_client.transfer_info()
