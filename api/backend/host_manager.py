# LOCAL
from api.backend.systems.host import Host

config_files = ["./configs/My Computer.yml", "./configs/fred.yml", "./configs/optimus.yml"]
hosts = [Host(f) for f in config_files]
HOST_MAP = {host.name: host for host in hosts}
