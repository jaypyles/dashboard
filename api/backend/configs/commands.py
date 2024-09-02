# STL
import os
from typing import Any

# PDM
import yaml

# LOCAL
from api.backend.systems import utils
from api.backend.configs.schema import Schema, Command


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
    # convert the model to a dictionary and remove None values
    config_dict = config.model_dump()
    filtered_config = remove_none_values(config_dict)

    # write the filtered dictionary to a YAML file
    with open(f"./configs/{filename}.yml", "w") as f:
        yaml.dump(filtered_config, f, default_flow_style=False, sort_keys=False)

    # change permissions so host can write
    os.chmod(f"./configs/{filename}.yml", 0o777)


def get_config_file_for_read(host: str):
    config = utils.read(f"./configs/{host}.yml")
    config.host.username = "user"
    config.host.password = "password"

    return config


def add_command_to_config(host: str, command: Command):
    config = utils.read(f"./configs/{host}.yml")

    if command.name in [com.name for com in config.commands]:
        return {"status": "failure", "reason": "Command with that name already exists."}

    config.commands.append(command)
    create_config_file(host, config)
    return {"status": "success", "reason": "Command successfully created."}

def remove_command_from_config(host: str, command: Command):
    config = utils.read(f"./configs/{host}.yml")

    if command.name not in [com.name for com in config.commands]:
        return {"status": "failure", "reason": "That command does not exist."}

    config.commands.remove(command)
    create_config_file(host, config)
    return {"status": "success", "reason": "Command successfully deleted."}

