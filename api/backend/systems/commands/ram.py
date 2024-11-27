# STL
from typing import Optional, final

# LOCAL
from api.backend.systems.arg import Arg
from api.backend.systems.command import Command


@final
class RamUsage(Command):
    def __init__(self) -> None:
        self.name = "ram_usage"
        self.command = r"free | awk 'NR==2 {print $3}' && free | awk 'NR==2 {print $2}'"
        self.args: Optional[list[Arg]] = None
        super().__init__(self.name, self.command, self.args)
        self.type = "system"
