from api.backend.systems.command import Command
from api.backend.systems.arg import Arg
from typing import Literal


class StorageMetric(Command):
    def __init__(self) -> None:
        self.name: str = "storage"
        self.command: str = "df"
        self.args: list[Arg] | None = [Arg(flag="-h", value=None)]
        super().__init__(self.name, self.command, self.args)
        self.type: Literal["system", "docker", "user"] = "system"
