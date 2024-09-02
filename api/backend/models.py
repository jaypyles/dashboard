# STL
from typing import Any, Union, Literal, Optional
from datetime import datetime

# PDM
from pydantic import BaseModel

# LOCAL
from api.backend.configs.schema import Schema, Command


class Job(BaseModel):
    id: Optional[str] = None
    host: str
    commands: list[Command]
    status: Union[Literal["queued"], Literal["running"], Literal["done"]]
    time_created: datetime
    output: Optional[dict[str, Any]]


class BuildConfigFile(BaseModel):
    filename: str
    config: Schema


class CommandChain(BaseModel):
    commands: list[str]


class AddCommand(BaseModel):
    command: Command
