from typing import Optional
from pydantic import BaseModel


class Host(BaseModel):
    name: str
    hostname: str
    port: int
    username: str
    password: str


class Arg(BaseModel):
    flag: str
    value: Optional[str] = None


class Command(BaseModel):
    name: str
    command: str
    args: Optional[list[Arg]] = None


class Schema(BaseModel):
    host: Host
    commands: list[Command]
