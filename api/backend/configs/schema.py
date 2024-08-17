from typing import Optional
from pydantic import BaseModel


class Host(BaseModel):
    name: str
    port: int


class Arg(BaseModel):
    flag: str
    value: Optional[str] = None


class Command(BaseModel):
    command: str
    args: list[Arg]


class Schema(BaseModel):
    host: Host
    commands: list[Command]
