from typing import Annotated

from app.dependencies.user_info import get_user_id, get_user_info
from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("/health")
async def health(user_id: Annotated[str, Depends(get_user_id)]):
    return {"status": "ok", "user_id": user_id}


@router.get("/health/user_info")
async def health_user_info(user_info: Annotated[dict, Depends(get_user_info)]):
    return {"status": "ok", "user_info": user_info}
