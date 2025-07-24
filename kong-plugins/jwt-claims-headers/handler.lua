local jwt_claims_headers = {
  PRIORITY = 900, -- Run after JWT plugin (which has priority 1005)
  VERSION = "1.0.0",
}

local json = require "cjson"

function jwt_claims_headers:access(conf)
  -- Debug: Log all headers and cookies
  local headers = kong.request.get_headers()
  kong.log.info("Request headers: ", json.encode(headers))

  -- Debug: Check for accessToken cookie specifically
  local cookies = kong.request.get_header("cookie")
  kong.log.info("Cookie header: ", cookies)

  -- Debug: Check context for JWT-related data
  kong.log.info("Context shared keys: ", json.encode(kong.ctx.shared))

    -- Get the JWT payload that was set by the JWT plugin
  -- The Kong JWT plugin stores the credential in authenticated_credential
  local credential = kong.ctx.shared.authenticated_credential
  local jwt_claims = nil

  if credential and credential.claims then
    jwt_claims = credential.claims
  elseif credential and credential.payload then
    jwt_claims = credential.payload
  else
    -- Fallback: try to decode the JWT token directly if credential is not available
    local jwt_token = kong.ctx.shared.authenticated_jwt_token
    if jwt_token then
      kong.log.info("Found JWT token, attempting to decode claims directly")
      -- Decode the JWT token manually using Kong's built-in libraries
      local parts = {}
      for part in jwt_token:gmatch("[^%.]+") do
        table.insert(parts, part)
      end

      if #parts >= 2 then
        -- Decode the payload (second part of JWT)
        local ngx_base64 = require "ngx.base64"
        local payload_encoded = parts[2]
        -- Add padding if needed for base64 decoding
        local padding = 4 - (#payload_encoded % 4)
        if padding ~= 4 then
          payload_encoded = payload_encoded .. string.rep("=", padding)
        end

        local payload_decoded = ngx_base64.decode_base64url(payload_encoded)
        if payload_decoded then
          jwt_claims = json.decode(payload_decoded)
          kong.log.info("Successfully decoded JWT claims: ", json.encode(jwt_claims))
        else
          kong.log.err("Failed to base64 decode JWT payload")
        end
      else
        kong.log.err("Invalid JWT token format")
      end
    else
      -- Last resort: try to get from other possible locations
      jwt_claims = kong.ctx.shared.jwt_keycloak_token or kong.ctx.shared.jwt_token
    end
  end

  if not jwt_claims then
    kong.log.err("No JWT claims found in context - credential: ", credential and "present" or "nil")
    kong.log.err("Available context keys: ", json.encode(kong.ctx.shared))
    return
  end

  kong.log.debug("JWT claims found: ", json.encode(jwt_claims))

  -- Extract claims based on configuration
  for _, claim_config in ipairs(conf.claims_to_headers or {}) do
    local claim_value = jwt_claims[claim_config.claim]
    if claim_value then
      -- Set the header
      kong.service.request.set_header(claim_config.header, tostring(claim_value))
      kong.log.info("Set header ", claim_config.header, " = ", tostring(claim_value))
    else
      kong.log.warn("Claim '", claim_config.claim, "' not found in JWT. Available claims: ", json.encode(jwt_claims))
    end
  end
end

return jwt_claims_headers
