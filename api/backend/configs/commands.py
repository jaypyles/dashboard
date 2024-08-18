import os
import yaml
from typing import Any

from api.backend.configs.schema import Schema


def remove_none_values(data: Any):
    """
    Recursively remove None values from a dictionary.
    """
    if isinstance(data, dict):
        nd: dict[str, Any] = {
            k: remove_none_values(v)
            for k, v in data.items()  # pyright: ignore[reportUnknownVariableType]
            if v is not None
        }
        return nd
    elif isinstance(data, list):
        nl: list[Any] = [
            remove_none_values(v)
            for v in data  # pyright: ignore[reportUnknownVariableType]
        ]
        return nl
    else:
        return data


def create_config_file(filename: str, config: Schema):
    # Convert the model to a dictionary and remove None values
    config_dict = config.model_dump()
    filtered_config = remove_none_values(config_dict)

    # Write the filtered dictionary to a YAML file
    with open(f"./configs/{filename}.yml", "w") as f:
        yaml.dump(filtered_config, f, default_flow_style=False)

    # change permissions so host can write
    os.chmod(f"./configs/{filename}.yml", 0o777)
