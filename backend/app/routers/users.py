"""
Rotas para CRUD de usuários
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user, get_current_user_or_allow_first, get_password_hash
from app.models.user import User
from app.schemas.user import User as UserSchema, UserCreate, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserSchema)
async def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_or_allow_first)
):
    """Criar novo usuário - permite apenas o primeiro usuário sem autenticação"""
    # Verificar se email já existe
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )
    
    # Criar usuário com senha hash
    db_user = User(
        email=user_data.email,
        password=get_password_hash(user_data.password),
        is_active=user_data.is_active
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Invalidar cache de usuários
    from app.core.redis_client import clear_cache_pattern
    clear_cache_pattern("users:*")
    
    return db_user


@router.get("/", response_model=List[UserSchema])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Listar usuários - requer autenticação"""
    from app.core.redis_client import get_cache, set_cache
    
    # Tentar obter do cache primeiro
    cache_key = f"users:list:{skip}:{limit}"
    cached_users = get_cache(cache_key)
    if cached_users:
        return cached_users
    
    # Se não está em cache, buscar no banco
    users = db.query(User).offset(skip).limit(limit).all()
    
    # Converter para dict para serialização JSON
    users_data = [{"id": u.id, "email": u.email, "is_active": u.is_active} for u in users]
    
    # Salvar no cache por 2 minutos
    set_cache(cache_key, users_data, expire=120)
    
    return users


@router.get("/{user_id}", response_model=UserSchema)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Obter usuário por ID - requer autenticação"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    return user


@router.put("/{user_id}", response_model=UserSchema)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Atualizar usuário - requer autenticação"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    # Atualizar campos se fornecidos
    if user_data.email is not None:
        # Verificar se novo email já existe
        if db.query(User).filter(User.email == user_data.email, User.id != user_id).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já cadastrado"
            )
        user.email = user_data.email
    
    if user_data.password is not None:
        user.password = get_password_hash(user_data.password)
    
    if user_data.is_active is not None:
        user.is_active = user_data.is_active
    
    db.commit()
    db.refresh(user)
    
    # Invalidar cache de usuários
    from app.core.redis_client import clear_cache_pattern
    clear_cache_pattern("users:*")
    
    return user


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Deletar usuário - requer autenticação"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    db.delete(user)
    db.commit()
    
    # Invalidar cache de usuários
    from app.core.redis_client import clear_cache_pattern
    clear_cache_pattern("users:*")
    
    return {"message": "Usuário deletado com sucesso"}