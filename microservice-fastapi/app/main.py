from app.lifespan.lifespan import lifespan
from app.routes.health_route import router as health_router
from app.routes.message_route import router as message_router
from fastapi import FastAPI

app = FastAPI(lifespan=lifespan)
app.include_router(health_router, prefix="/api/message")
app.include_router(message_router, prefix="/api/message")
