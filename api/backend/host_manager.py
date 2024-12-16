# LOCAL
from api.backend.systems.host import Host
import os

from api.backend.logging import LOG

config_files = [
    f"./configs/{config}"
    for config in os.listdir("./configs")
    if os.path.isfile(f"./configs/{config}")
]

LOG.info(f"Loaded config files: {config_files}")

hosts = [Host(f) for f in config_files]
HOST_MAP = {host.name: host for host in hosts}

LOG.info(f"Loaded hosts: {HOST_MAP}")
