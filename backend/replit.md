# Financial Assets Management API

## Overview

This is a FastAPI-based backend application for managing financial assets, designed to handle clients, assets, allocations, and transactions. The application provides JWT-based authentication, complete CRUD operations for users and clients, and a comprehensive system for tracking financial asset allocations and transactions. Built with modern Python technologies including FastAPI, SQLAlchemy 2, and Pydantic v2, it serves as the backend foundation for a financial portfolio management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Web Framework
- **FastAPI**: Modern, high-performance web framework with automatic OpenAPI documentation
- **Uvicorn**: ASGI server for serving the FastAPI application
- **Pydantic v2**: Data validation and serialization using Python type hints

### Database Layer
- **SQLAlchemy 2**: Modern ORM with declarative base and future-style sessions
- **Alembic**: Database migration management system
- **SQLite**: Default database (configurable to PostgreSQL via environment variables)
- **Database Models**: Five core entities - Users, Clients, Assets, Allocations, and Transactions

### Authentication & Security
- **JWT (JSON Web Tokens)**: Stateless authentication using PyJWT and python-jose
- **Bcrypt**: Password hashing using passlib with bcrypt scheme
- **HTTPBearer**: Token-based security scheme for protecting endpoints
- **Special First User Logic**: Allows creation of the first user without authentication

### Caching Layer
- **Redis**: Optional caching system with graceful fallback when unavailable
- **Connection Resilience**: Application continues to function without Redis
- **Cache Management**: User data caching with pattern-based invalidation

### API Structure
- **Router-based Organization**: Separate routers for auth, users, and health endpoints
- **RESTful Design**: Standard HTTP methods for CRUD operations
- **Automatic Documentation**: Swagger/OpenAPI docs available at `/docs`
- **Health Checks**: Multiple health check endpoints for monitoring

### Data Models
- **Users**: Authentication and access control
- **Clients**: Customer management with email and activity status
- **Assets**: Financial instruments with ticker, exchange, and currency information
- **Allocations**: Client asset holdings with quantity, price, and date tracking
- **Transactions**: Deposit/withdrawal operations with amount and notes

### Configuration Management
- **Environment-based Settings**: Pydantic Settings for configuration management
- **JWT Configuration**: Configurable secret keys, algorithms, and token expiration
- **Database URL Override**: Environment variable support for database switching

### Testing Infrastructure
- **Pytest**: Testing framework with FastAPI TestClient integration
- **SQLite Test Database**: Isolated test database with fixture management
- **Dependency Override**: Test-specific database session injection

## External Dependencies

### Core Framework Dependencies
- **FastAPI**: Web framework and automatic API documentation
- **Uvicorn**: ASGI server for production deployment
- **SQLAlchemy**: Database ORM and query builder
- **Alembic**: Database schema migration management

### Authentication & Security
- **python-jose[cryptography]**: JWT token creation and validation
- **passlib[bcrypt]**: Password hashing and verification
- **python-multipart**: Form data parsing support

### Data Validation
- **Pydantic**: Data validation and serialization
- **email-validator**: Email address validation support

### Database & Caching
- **Redis**: Caching layer (optional, with graceful degradation)
- **SQLite**: Default database (PostgreSQL support via environment configuration)

### Development & Testing
- **Pytest**: Testing framework
- **pytest-asyncio**: Asynchronous testing support

### Deployment Considerations
- **Environment Variables**: Support for DATABASE_URL, SESSION_SECRET, and Redis configuration
- **Container Ready**: Configured for containerized deployment
- **Health Monitoring**: Multiple health check endpoints for load balancers and monitoring systems