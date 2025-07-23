from typing import Annotated

from fastapi import Header, HTTPException


async def get_user_id(x_user_id: Annotated[str | None, Header()] = None) -> str:
    """
    A dependency function to extract the user ID from the X-User-ID header.

    Raises:
        HTTPException: If the X-User-ID header is missing.

    Returns:
        The user ID as a string.

    curl -X GET "http://localhost:8081/api/health" -H "X-User-ID: 123"
    """
    if x_user_id is None:
        raise HTTPException(status_code=400, detail="X-User-ID header is missing")
    return x_user_id


async def get_user_info(
    x_user_id: Annotated[str | None, Header()] = None,
    x_user_email: Annotated[str | None, Header()] = None,
) -> str:
    """
    curl -X GET "http://localhost:8081/api/health/user_info" -H "X-User-ID: 123" \
    -H "X-User-Email: test@test.com"
    """
    if x_user_id is None and x_user_email is None:
        raise HTTPException(
            status_code=400, detail="X-User-ID or X-User-Email header is missing"
        )
    return {"user_id": x_user_id, "user_email": x_user_email}
