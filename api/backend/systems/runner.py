from abc import ABC
import api.backend.systems.utils as utils

from api.backend.systems.command import Command


class Runner(ABC):
    """Command Runner Base Class"""

    def __init__(self) -> None:
        super().__init__()
        self.host: str
        self.port: int
        self.commands: list[Command] = []

    def read_config(self, config_file: str):
        """
        Initializes commands from a config file.
        """
        try:
            config = utils.read(config_file)
            self.host = config.host.name
            self.port = config.host.port
            self.commands = Command.build_commands(config.commands)
            print(self.commands)
        except Exception as e:
            print(e)


class MachineRunner(Runner):
    def __init__(self) -> None:
        super().__init__()
