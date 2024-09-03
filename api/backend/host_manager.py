# LOCAL
from api.backend.systems.host import Host
import os

config_files = [f"./configs/{config}" for config in os.listdir("./configs")]
hosts = [Host(f) for f in config_files]
HOST_MAP = {host.name: host for host in hosts}
