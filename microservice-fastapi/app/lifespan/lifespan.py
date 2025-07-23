from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.databases.mongodb import MongoConnector


@asynccontextmanager
async def lifespan(app: FastAPI):
    # This context manager can be used to initialize resources
    # on startup and clean them up on shutdown.
    # The MongoDB client will be initialized on first use.
    yield
    # Close the client connection when the application shuts down
    await MongoConnector.close_client()
