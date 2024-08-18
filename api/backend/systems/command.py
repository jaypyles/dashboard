from typing import Optional
from api.backend.configs.schema import Command as SchemaCommand
from api.backend.systems.arg import Arg
from typing_extensions import override


class CommandNotFoundError(Exception):
    """Raised when trying to find a command which does not exist by name"""

    pass


class Command:
    def __init__(self, name: str, command: str, args: Optional[list[Arg]]) -> None:
        self.name = name
        self.command = command
        self.args = args

    @override
    def __repr__(self):
        arg_string = ""

        if not self.args:
            return ""

        for arg in self.args:
            arg_string += f"{arg}\n"

        return f"Command: {self.command}\nArgs: {arg_string}"

    @override
    def __str__(self):
        if not self.args:
            return self.command

        return f"{self.command} " + " ".join(str(arg) for arg in self.args)

    @staticmethod
    def __build_command(schema_command: SchemaCommand):
        return Command(
            name=schema_command.name,
            command=schema_command.command,
            args=Arg.build_args(schema_command.args),
        )

    @staticmethod
    def build_commands(commands: list[SchemaCommand]):
        return [Command.__build_command(command) for command in commands]
