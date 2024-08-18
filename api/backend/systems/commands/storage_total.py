from api.backend.systems.command import Command
from api.backend.systems.arg import Arg


class StorageMetric(Command):
    def __init__(self) -> None:
        self.name = "storage"
        self.command = "df"
        self.args = [Arg(flag="-h", value=None)]
        super().__init__(self.name, self.command, self.args)
        self.type = "system"
