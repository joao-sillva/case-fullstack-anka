"""
Testes para endpoints de usuários
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.core.database import get_db, Base
from app.core.auth import get_password_hash
from app.models.user import User

# Configurar banco de dados de teste
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override da dependência de banco
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture
def test_db():
    """Fixture para preparar banco de teste"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def sample_user_data():
    """Dados de usuário para testes"""
    return {
        "email": "test@example.com",
        "password": "testpass123",
        "is_active": True
    }


def test_create_first_user_without_auth(test_db, sample_user_data):
    """Testa criação do primeiro usuário sem autenticação"""
    response = client.post("/users/", json=sample_user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == sample_user_data["email"]
    assert data["is_active"] == sample_user_data["is_active"]
    assert "password" not in data


def test_create_second_user_requires_auth(test_db):
    """Testa que o segundo usuário requer autenticação"""
    # Criar primeiro usuário
    first_user = {
        "email": "first@example.com",
        "password": "password123",
        "is_active": True
    }
    client.post("/users/", json=first_user)
    
    # Tentar criar segundo usuário sem autenticação
    second_user = {
        "email": "second@example.com", 
        "password": "password456",
        "is_active": True
    }
    response = client.post("/users/", json=second_user)
    assert response.status_code == 401
    assert "autenticação necessário" in response.json()["detail"].lower()


def test_login_with_valid_credentials(test_db):
    """Testa login com credenciais válidas"""
    # Criar usuário
    user_data = {
        "email": "login@example.com",
        "password": "loginpass123",
        "is_active": True
    }
    client.post("/users/", json=user_data)
    
    # Fazer login
    login_data = {
        "email": user_data["email"],
        "password": user_data["password"]
    }
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_with_invalid_credentials(test_db):
    """Testa login com credenciais inválidas"""
    login_data = {
        "email": "nonexistent@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == 401
    assert "incorretos" in response.json()["detail"].lower()


def test_list_users_requires_auth(test_db):
    """Testa que listagem de usuários requer autenticação"""
    response = client.get("/users/")
    assert response.status_code == 401


def test_list_users_with_authentication(test_db):
    """Testa listagem de usuários autenticada e cache invalidation"""
    # Criar primeiro usuário
    user_data = {
        "email": "auth@example.com",
        "password": "authpass123",
        "is_active": True
    }
    create_response = client.post("/users/", json=user_data)
    assert create_response.status_code == 200
    
    # Fazer login para obter token
    login_data = {
        "email": user_data["email"],
        "password": user_data["password"]
    }
    login_response = client.post("/auth/login", json=login_data)
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    
    # Listar usuários autenticado
    headers = {"Authorization": f"Bearer {token}"}
    list_response = client.get("/users/", headers=headers)
    assert list_response.status_code == 200
    users = list_response.json()
    assert len(users) == 1
    assert users[0]["email"] == user_data["email"]
    
    # Criar segundo usuário para testar cache invalidation
    second_user_data = {
        "email": "second@example.com",
        "password": "secondpass123",
        "is_active": True
    }
    create_response_2 = client.post("/users/", json=second_user_data, headers=headers)
    assert create_response_2.status_code == 200
    
    # Verificar que a lista foi atualizada (cache invalidado)
    list_response_2 = client.get("/users/", headers=headers)
    assert list_response_2.status_code == 200
    users_after = list_response_2.json()
    assert len(users_after) == 2


def test_health_check_endpoints(test_db):
    """Testa endpoints de health check"""
    response = client.get("/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    
    response = client.get("/health/detailed")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "components" in data


if __name__ == "__main__":
    pytest.main([__file__])