from pydantic import BaseModel

from api.backend.configs.schema import Schema


class BuildConfigFile(BaseModel):
    filename: str
    config: Schema
