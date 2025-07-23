from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from app.configs.config import get_settings
from pymongo import AsyncMongoClient
from pymongo.database import Database


class MongoConnector:
    _client: AsyncMongoClient | None = None

    @classmethod
    async def get_client(cls, mongodb_uri: str | None = None) -> AsyncMongoClient:
        """
        Retrieves the asynchronous MongoDB client, initializing it if necessary.
        The MongoDB URI is retrieved from the `MONGODB_URI` environment variable
        if not provided directly.
        """
        if cls._client is None:
            settings = get_settings()
            uri = mongodb_uri or settings.mongodb_uri
            if not uri:
                raise ValueError(
                    "MongoDB URI must be provided either as an argument or "
                    "set in the MONGODB_URI environment variable."
                )
            cls._client = AsyncMongoClient(uri)
        return cls._client

    @classmethod
    async def close_client(cls):
        """Closes the MongoDB client connection if it exists."""
        if cls._client:
            cls._client.close()
            cls._client = None

    @classmethod
    @asynccontextmanager
    async def get_connection(
        cls, mongodb_uri: str | None = None
    ) -> AsyncGenerator[Database, None]:
        """
        Provides a MongoDB database object through an async context manager.

        This method is suitable for use as a FastAPI dependency or in any
        other asynchronous context.

        Usage in FastAPI:
        ```python
        from fastapi import Depends, FastAPI
        from pymongo.database import Database

        app = FastAPI()

        @app.get("/")
        async def read_data(db: Database = Depends(MongoConnector.get_connection)):
            # ... use db object
            pass
        ```

        Usage in a standalone script:
        ```python
        import asyncio

        async def main():
            async with MongoConnector.get_connection() as db:
                # ... use db object
                pass
            await MongoConnector.close_client()

        if __name__ == "__main__":
            asyncio.run(main())
        ```
        """
        client = await cls.get_client(mongodb_uri)
        try:
            # get_database() with no arguments uses the database from the URI
            yield client.get_database()
        finally:
            # The client is managed at the class level and should not be
            # closed after each use. It will be closed on app shutdown.
            pass
