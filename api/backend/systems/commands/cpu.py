from api.backend.systems.command import Command
from api.backend.systems.arg import Arg


class CpuUsage(Command):
    def __init__(self) -> None:
        self.name = "cpu_usage"
        self.command = r"""
        top -bn1 | grep "Cpu(s)" | \
        sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | \
        awk '{print 100 - $1"%"}'
        """
        self.args: list[Arg] = []
        super().__init__(self.name, self.command, self.args)


class CpuCores(Command):
    def __init__(self) -> None:
        self.name = "cpu_cores"
        self.command = """
            grep -m 1 "cpu cores" /proc/cpuinfo | awk '{print $4}'
        """
        self.args: list[Arg] = []
        super().__init__(self.name, self.command, self.args)


class CpuThreads(Command):
    def __init__(self) -> None:
        self.name = "cpu_threads"
        self.command = """
            grep -c ^processor /proc/cpuinfo
        """
        self.args: list[Arg] = []
        super().__init__(self.name, self.command, self.args)
