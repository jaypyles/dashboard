from api.backend.configs.schema import Arg as SchemaArg
from typing import Optional
from typing_extensions import override


class Arg:
    def __init__(self, flag: str, value: Optional[str]) -> None:
        self.flag = flag
        self.value = value

    @override
    def __repr__(self):
        return f"flag: {self.flag}, value: {self.value}"

    @override
    def __str__(self):
        if self.value:
            return f"{self.flag}={self.value}"

        return self.flag

    @staticmethod
    def __build_arg(schema_arg: SchemaArg):
        return Arg(schema_arg.flag, schema_arg.value)

    @staticmethod
    def build_args(args: Optional[list[SchemaArg]]):
        if not args:
            arg_list: list[Arg] = []
            return arg_list

        return [Arg.__build_arg(arg) for arg in args]
