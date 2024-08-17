import yaml
from api.backend.configs.schema import Schema
from typing import Any


def read(path: str):
    with open(path) as stream:
        yaml_file: dict[str, Any] = yaml.safe_load(stream)
        y = Schema(**yaml_file)
        return y
