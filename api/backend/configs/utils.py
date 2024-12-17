# STL
from fastapi import UploadFile
import os

BACKGROUND_PATH = "configs/assets/background.jpeg"


def upload_background(background_file: UploadFile):
    os.makedirs(os.path.dirname(BACKGROUND_PATH), exist_ok=True)

    with open(BACKGROUND_PATH, "wb") as f:
        _ = f.write(background_file.file.read())


def get_background():
    if not os.path.exists(BACKGROUND_PATH):
        return None

    with open(BACKGROUND_PATH, "rb") as f:
        return f.read()
