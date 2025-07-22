# TODO: API Gateway Learning Project

This file outlines the steps to build a complete microservices project with an API Gateway.

## 1. Project Setup

- [x] Initialize the git repository.
- [x] Create the directory structure for all services.
- [x] Create a `docker-compose.yml` file to define and link all services.

## 2. Database (MongoDB)

- [ ] Add a MongoDB service to `docker-compose.yml`.
- [ ] Configure environment variables for the root user and password.
- [ ] Create a volume for data persistence.
- [ ] Add a redis service to `docker-compose.yml`
- [ ] create a volume for redis if necessary
- [ ] (Optional) Create an initialization script to create a database and user for the auth service.

## 3. Authentication Service (Java Spring Boot)

- [ ] Set up a new Spring Boot project.
- [ ] Add dependencies: Spring Web, Spring Data MongoDB, Spring Security, JJWT.
- [ ] Create a `User` model.
- [ ] Create a `UserRepository` interface.
- [ ] Implement a `UserService` for user registration and login.
- [ ] Implement a `JwtUtil` class to generate and validate JWTs.
- [ ] Create a `AuthController` with `/register` and `/login` endpoints.
- [ ] Configure Spring Security to protect endpoints.
- [ ] Connect the service to the MongoDB container.
- [ ] Create a `Dockerfile` for the Spring Boot application.
- [ ] Add the auth service to `docker-compose.yml`.

## 4. Microservice (FastAPI)

- [ ] Set up a new FastAPI project.
- [ ] Create a simple endpoint (e.g., `/items/`) that requires authentication.
- [ ] Implement a dependency to verify the JWT from the `Authorization` header.
- [ ] Create a `Dockerfile` for the FastAPI application.
- [ ] Add the microservice to `docker-compose.yml`.

## 5. API Gateway (Kong)

- [ ] Add Kong and its database (PostgreSQL) to `docker-compose.yml`.
- [ ] Create a `kong.yml` declarative configuration file.
- [ ] **In `kong.yml`:**
    - [ ] Define a service for the `auth-service`.
    - [ ] Define a route for the `/auth` path that points to the `auth-service`.
    - [ ] Define a service for the `microservice-fastapi`.
    - [ ] Define a route for the `/api` path that points to the `microservice-fastapi`.
    - [ ] Add the JWT plugin to the `/api` route.
- [ ] Mount the `kong.yml` file as a volume for the Kong container.

## 6. Frontend (React)

- [ ] Create a new React application using Create React App.
- [ ] Create a `components` folder.
- [ ] Create a `LoginPage` component.
- [ ] Create a `RegisterPage` component.
- [ ] Create a `DashboardPage` component to display data from the microservice.
- [ ] Use `axios` or `fetch` to make API calls to the gateway.
- [ ] Implement routing using `react-router-dom`.
- [ ] Store the JWT in local storage or a cookie.
- [ ] Create a `Dockerfile` for the React application.
- [ ] Add the frontend service to `docker-compose.yml`.

## 7. Integration and Testing

- [ ] Start all services with `docker-compose up --build`.
- [ ] Test the registration endpoint.
- [ ] Test the login endpoint and check for a JWT.
- [ ] Use the JWT to access the protected microservice endpoint through the gateway.
- [ ] Verify that accessing the protected endpoint without a JWT fails.
- [ ] Write a final `README.md` with instructions on how to run the project.
