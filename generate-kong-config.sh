#!/bin/bash

# Generate kong.yml from template with environment variable substitution

if [ -z "$JWT_PUBLIC_KEY" ]; then
    echo "Error: JWT_PUBLIC_KEY environment variable is not set"
    echo "Please run: source export_jwt_public_key.sh"
    exit 1
fi

echo "Generating kong.yml from template..."
# First substitute variables, then convert \n to actual newlines with proper indentation
envsubst < api-gateway-kong/kong.yml.template | sed 's/\\n/\
          /g' > api-gateway-kong/kong.yml

echo "✅ kong.yml generated successfully with JWT public key"
echo "📄 You can now run: docker-compose up -d"
