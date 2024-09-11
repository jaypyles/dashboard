# STL
from abc import ABC

# PDM
import paramiko

# LOCAL
import api.backend.systems.utils as utils
from api.backend.systems.command import Command, CommandNotFoundError
from api.backend.systems.commands import DOCKER_COMMANDS_MAP, SYSTEM_COMMANDS_MAP


class Runner(ABC):
    """Runner Base Class"""

    def __init__(self) -> None:
        super().__init__()
        self.hostname: str
        self.port: int
        self.username: str
        self.password: str
        self.commands: dict[str, Command] = {}
        self.client: paramiko.SSHClient = paramiko.SSHClient()

    def __connect(self):
        self.client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        return self.client.connect(
            self.hostname, self.port, self.username, self.password
        )

    def read_config(self, config_file: str):
        """
        Initializes commands from a config file.
        """
        try:
            config = utils.read(config_file)
            self.hostname = config.host.hostname
            self.port = config.host.port
            self.username = config.host.username
            self.password = config.host.password
            self.commands.update(
                {
                    command.name: command
                    for command in Command.build_commands(config.commands)
                }
            )
        except Exception as e:
            print(e)

    def dispatch(self, command_name: str):
        try:
            command = self.commands[command_name]
        except KeyError:
            raise CommandNotFoundError

        self.__connect()

        _, ssh_stdout, ssh_stderr = self.client.exec_command(str(command))
        out = "".join(utils.remove_terminal_characters(ssh_stdout))

        stdout = out
        stderr = ssh_stderr.read().decode("utf-8")

        self.client.close()

        return stdout, stderr


class MachineRunner(Runner):
    def __init__(self) -> None:
        super().__init__()
        self.commands.update(SYSTEM_COMMANDS_MAP)
        self.commands.update(DOCKER_COMMANDS_MAP)


class DockerRunner(Runner):
    def __init__(self) -> None:
        super().__init__()
