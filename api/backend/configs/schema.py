from pydantic import BaseModel


class Host(BaseModel):
    name: str
    hostname: str
    port: int
    username: str
    password: str
    storage: list[str] | None = None


class Arg(BaseModel):
    flag: str
    value: str | None = None


class Command(BaseModel):
    name: str
    command: str
    args: list[Arg] | None = None


class Schema(BaseModel):
    host: Host
    commands: list[Command]
