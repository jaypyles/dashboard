# LOCAL
import api.backend.systems.utils as utils
from api.backend.systems.runner import MachineRunner


class Host:
    def __init__(self, config_file: str) -> None:
        self.config_file: str = config_file
        config = utils.read(self.config_file)
        self.name: str = config.host.name
        self.hostname: str = config.host.hostname
        self.runner: MachineRunner = MachineRunner()
        self.runner.read_config(config_file)

    def refresh(self):
        self.runner.read_config(self.config_file)
