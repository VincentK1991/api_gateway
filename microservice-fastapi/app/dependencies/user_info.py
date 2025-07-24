from typing import Annotated

from fastapi import Header, HTTPException, Request


async def get_user_id(
    request: Request, x_user_id: Annotated[str | None, Header()] = None
) -> str:
    """
    A dependency function to extract the user ID from the X-User-ID header.
    This header is now set by our custom Kong plugin 'jwt-claims-headers'.

    Raises:
        HTTPException: If the X-User-ID header is missing.

    Returns:
        The user ID as a string.

    curl -X GET "http://localhost:8000/api/health" --cookie "accessToken=YOUR_JWT_TOKEN"
    """

    # 🔍 DEBUG: Print all request details
    print("\n" + "=" * 60)
    print("🐛 DEBUGGING REQUEST IN get_user_id()")
    print("=" * 60)

    # Request method and URL
    print(f"📋 Method: {request.method}")
    print(f"📋 URL: {request.url}")
    print(f"📋 Path: {request.url.path}")
    print(f"📋 Query Params: {dict(request.query_params)}")

    # All headers
    print(f"\n📧 ALL HEADERS ({len(request.headers)} total):")
    for name, value in request.headers.items():
        # Highlight Kong-related and JWT-related headers
        if name.lower().startswith(("x-", "authorization", "cookie")):
            print(f"  🎯 {name}: {value}")
        else:
            print(f"     {name}: {value}")

    # Cookies
    print(f"\n🍪 COOKIES ({len(request.cookies)} total):")
    for name, value in request.cookies.items():
        if name == "accessToken":
            print(
                f"  🎯 {name}: {value[:50]}..."
                if len(value) > 50
                else f"  🎯 {name}: {value}"
            )
        else:
            print(f"     {name}: {value}")

    # Kong-specific headers check
    print("\n🦍 KONG HEADERS CHECK:")
    kong_headers = {
        "X-User-ID": request.headers.get("x-user-id"),
        "X-User-Email": request.headers.get("x-user-email"),
        "X-Consumer-ID": request.headers.get("x-consumer-id"),
        "X-Consumer-Username": request.headers.get("x-consumer-username"),
        "X-Kong-Request-Id": request.headers.get("x-kong-request-id"),
    }

    for header_name, header_value in kong_headers.items():
        status = "✅ FOUND" if header_value else "❌ MISSING"
        print(f"  {header_name}: {header_value} ({status})")

    # Function parameter check
    print("\n🔧 FUNCTION PARAMETER:")
    print(f"  x_user_id parameter: {x_user_id}")

    print("=" * 60)

    # 🚨 BREAKPOINT: Uncomment this line to pause execution

    if x_user_id is None:
        raise HTTPException(status_code=401, detail="X-User-ID header is missing")
    return x_user_id


async def get_user_info(
    request: Request,
    x_user_id: Annotated[str | None, Header()] = None,
    x_user_email: Annotated[str | None, Header()] = None,
) -> dict:
    """
    Extract user information from headers set by Kong's jwt-claims-headers plugin.

    curl -X GET "http://localhost:8000/api/health/user_info" --cookie "accessToken=YOUR_JWT_TOKEN"
    """

    # 🔍 DEBUG: Print Kong headers for user_info
    print("\n🐛 get_user_info() - Kong Headers:")
    print(f"  X-User-ID from header: {request.headers.get('x-user-id')}")
    print(f"  X-User-Email from header: {request.headers.get('x-user-email')}")
    print(f"  x_user_id parameter: {x_user_id}")
    print(f"  x_user_email parameter: {x_user_email}")

    if x_user_id is None and x_user_email is None:
        raise HTTPException(
            status_code=401, detail="X-User-ID or X-User-Email header is missing"
        )
    return {"user_id": x_user_id, "user_email": x_user_email}
