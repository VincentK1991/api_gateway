#!/bin/bash

# Path to the public key file
PUBLIC_KEY_FILE="auth-service-springboot/src/main/resources/keys/public_key.pem"

# Check if the public key file exists
if [ ! -f "$PUBLIC_KEY_FILE" ]; then
    echo "Error: Public key file not found at: $PUBLIC_KEY_FILE"
    echo "Please ensure the file exists or update the path in this script."
    exit 1
fi

echo "Reading JWT public key from: $PUBLIC_KEY_FILE"

# Read the public key file and convert newlines to \n for template substitution
export JWT_PUBLIC_KEY=$(cat "$PUBLIC_KEY_FILE" | sed ':a;N;$!ba;s/\n/\\n/g')

# Auto-detect host IP that Docker containers can reach
echo "🔍 Detecting host IP for service communication..."

# Method 1: Try to get the IP that can reach external services
HOST_IP=$(ip route get 1.1.1.1 2>/dev/null | awk '{print $7; exit}' 2>/dev/null)

# Method 2: Fallback to docker network gateway
if [ -z "$HOST_IP" ]; then
    HOST_IP=$(docker network inspect api_gateway_api-network 2>/dev/null | grep '"Gateway"' | awk -F'"' '{print $4}' | head -1)
fi

# Method 3: Final fallback to localhost (for host network mode)
if [ -z "$HOST_IP" ]; then
    HOST_IP="localhost"
    echo "⚠️  Using localhost as fallback - may not work with Docker containers"
fi

# Set service endpoint environment variables
export AUTH_SERVICE_HOST="$HOST_IP"
export AUTH_SERVICE_PORT="8080"
export MESSAGE_SERVICE_HOST="$HOST_IP"
export MESSAGE_SERVICE_PORT="8081"

echo "✅ JWT_PUBLIC_KEY environment variable set successfully"
echo "📏 Key length: ${#JWT_PUBLIC_KEY} characters"
echo "🌐 Service endpoints configured:"
echo "   - Auth Service: http://$AUTH_SERVICE_HOST:$AUTH_SERVICE_PORT"
echo "   - Message Service: http://$MESSAGE_SERVICE_HOST:$MESSAGE_SERVICE_PORT"
echo "🔧 You can now run: ./generate-kong-config.sh"
