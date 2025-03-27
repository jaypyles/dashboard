from pydantic import BaseModel


class AppConfig(BaseModel):
    files_url: str
