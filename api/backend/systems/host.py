import api.backend.systems.utils as utils

from api.backend.systems.runner import MachineRunner


class Host:
    def __init__(self, config_file: str) -> None:
        config = utils.read(config_file)
        self.name = config.host.name
        self.hostname = config.host.hostname
        self.runner = MachineRunner()
        self.runner.read_config(config_file)
