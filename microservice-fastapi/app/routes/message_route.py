from fastapi import APIRouter

router = APIRouter()


@router.post("/message")
async def message(message: str):
    return {"message": f"reply of {message}"}
