# LOCAL
from api.backend.systems.command import Command

# LOCAL
from .cpu import CpuCores, CpuUsage, CpuThreads
from .ram import RamUsage
from .docker import ContainerCount
from .uptime import Uptime
from .storage_total import StorageMetric

SYSTEM_COMMANDS: list[Command] = [
    StorageMetric(),
    CpuUsage(),
    CpuCores(),
    CpuThreads(),
    Uptime(),
    RamUsage(),
]
SYSTEM_COMMANDS_MAP = {command.name: command for command in SYSTEM_COMMANDS}

DOCKER_COMMANDS: list[Command] = [ContainerCount()]
DOCKER_COMMANDS_MAP = {command.name: command for command in DOCKER_COMMANDS}
