from functools import cache

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str
    openai_api_key: str
    mongodb_uri: str = Field(
        default="mongodb://testuser:test1234@localhost:27017/authdb?authSource=admin"
    )
    jwt_public_key: str

    class Config:
        env_file = "/home/vkieuvongngam/exploration/api_gateway/microservice-fastapi/.env"


@cache
def get_settings():
    return Settings()
