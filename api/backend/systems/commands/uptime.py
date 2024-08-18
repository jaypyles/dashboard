# LOCAL
from api.backend.systems.arg import Arg
from api.backend.systems.command import Command


class Uptime(Command):
    def __init__(self) -> None:
        self.name = "uptime"
        self.command = """
            uptime
        """
        self.args: list[Arg] = []
        super().__init__(self.name, self.command, self.args)
        self.type = "system"
