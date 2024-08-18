from paramiko import ChannelFile
import yaml
from api.backend.configs.schema import Schema
from typing import Any
import re


def read(path: str):
    with open(path) as stream:
        yaml_file: dict[str, Any] = yaml.safe_load(stream)
        y = Schema.model_validate(yaml_file)
        return y


def remove_terminal_characters(text: ChannelFile):
    lines: list[str] = [line for line in text]
    new_lines: list[str] = []

    for line in lines[:1]:
        ansi_escape = re.compile(r"\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])")
        ansi_section = re.compile(r"[0-9];.*;")
        last_ansi_section = re.compile(r"#[a-zA-Z0-9]{6}")

        result = ansi_escape.sub("", line)
        ansi_section = re.compile(r"[0-9];.*;")
        result = ansi_section.sub("", result)
        result = last_ansi_section.sub("", result)

        new_lines.append(result)

    for line in lines[1:]:
        new_lines.append(line)

    return new_lines
