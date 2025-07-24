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

echo "✅ JWT_PUBLIC_KEY environment variable set successfully"
echo "📏 Key length: ${#JWT_PUBLIC_KEY} characters"
echo "🔧 You can now run: ./generate-kong-config.sh"
