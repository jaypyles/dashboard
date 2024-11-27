# PDM
from typing_extensions import final

# LOCAL
from api.backend.systems.arg import Arg
from api.backend.systems.command import Command


@final
class ContainerCount(Command):
    def __init__(self) -> None:
        self.name = "count-containers"
        self.command = "docker ps | awk 'NR > 1 {count++} END {print count}'"
        self.args: list[Arg] = []
        super().__init__(self.name, self.command, self.args)
        self.type = "docker"
