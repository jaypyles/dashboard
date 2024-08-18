# PDM
from pydantic import BaseModel

# LOCAL
from api.backend.configs.schema import Schema


class BuildConfigFile(BaseModel):
    filename: str
    config: Schema


class CommandChain(BaseModel):
    commands: list[str]
