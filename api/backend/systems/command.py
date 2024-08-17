from api.backend.configs.schema import Command as SchemaCommand
from api.backend.systems.arg import Arg
from typing_extensions import override


class Command:
    def __init__(self, command: str, args: list[Arg]) -> None:
        self.command = command
        self.args = args

    @override
    def __repr__(self):
        arg_string = ""
        for arg in self.args:
            arg_string += f"{arg}\n"

        return f"Command: {self.command}\nArgs: {arg_string}"

    @staticmethod
    def __build_command(schema_command: SchemaCommand):
        return Command(
            command=schema_command.command, args=Arg.build_args(schema_command.args)
        )

    @staticmethod
    def build_commands(commands: list[SchemaCommand]):
        return [Command.__build_command(command) for command in commands]
