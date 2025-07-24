.PHONY: help deploy-containers start-auth start-fastapi stop-containers clean setup

# Default target
help:
	@echo "Available targets:"
	@echo "  setup            - Initial setup (generate Kong config)"
	@echo "  deploy-containers - Deploy Docker containers (Kong + MongoDB)"
	@echo "  start-auth       - Start Spring Boot auth service"
	@echo "  start-fastapi    - Start FastAPI message service"
	@echo "  stop-containers  - Stop all Docker containers"
	@echo "  clean           - Stop containers and clean up"

# Setup: Generate Kong configuration from template
setup:
	@echo "🔧 Setting up Kong configuration..."
	@echo "🔍 Auto-detecting service endpoints..."
	@bash -c "source export_jwt_public_key.sh && ./generate-kong-config.sh"

# Deploy Docker containers (Kong + MongoDB)
deploy-containers: setup
	@echo "🚀 Deploying Docker containers..."
	docker-compose up -d

# Start Spring Boot auth service
start-auth:
	@echo "🔐 Starting Spring Boot auth service..."
	cd auth-service-springboot && ./mvnw spring-boot:run

# Start FastAPI message service
start-fastapi:
	@echo "🐍 Starting FastAPI message service..."
	cd microservice-fastapi && ./start_app.sh

# Stop Docker containers
stop-containers:
	@echo "🛑 Stopping Docker containers..."
	docker-compose down

# Clean up everything
clean: stop-containers
	@echo "🧹 Cleaning up..."
	docker-compose down -v
	@echo "✅ Cleanup complete"
