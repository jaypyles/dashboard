# Import the necessary classes
from api.backend.systems.command import Command
from .storage_total import StorageMetric
from .cpu import CpuUsage, CpuCores, CpuThreads
from .uptime import Uptime


SYSTEM_COMMANDS: list[Command] = [
    StorageMetric(),
    CpuUsage(),
    CpuCores(),
    CpuThreads(),
    Uptime(),
]
SYSTEM_COMMANDS_MAP = {command.name: command for command in SYSTEM_COMMANDS}
