# STL
import os
from typing import Any

# PDM
import yaml

# LOCAL
from api.backend.integrations.apps import Apps

INTEGRATION_CONFIG_PATH: str = "./configs/integrations"


def config_exists(name: str):
    return os.path.exists(f"{INTEGRATION_CONFIG_PATH}/{name}.yml")


class Integration:
    def __init__(self, name: str):
        self.config_path: str = INTEGRATION_CONFIG_PATH
        self.name: str = name
        self.config: dict[str, Any] = self.__load_config()

    def __load_config(self):
        config: dict[str, Any] = {}

        if os.path.exists(f"{self.config_path}/{self.name}.yml"):
            config = yaml.load(
                open(f"{self.config_path}/{self.name}.yml"), Loader=yaml.FullLoader
            )

        return config


INTEGRATIONS = [Integration(app.value) for app in Apps if config_exists(app.value)]
