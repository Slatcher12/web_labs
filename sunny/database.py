from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base

from sqlalchemy.ext.asyncio import AsyncSession

Base = declarative_base()

# Define the database URL (PostgreSQL example)
DATABASE_URL = "postgresql+asyncpg://sunny_owner:an51EcUzvGLD@ep-round-night-a2kqj7q6.eu-central-1.aws.neon.tech/sunny"

# Create an async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create the session factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for declarative models
Base = declarative_base()


# Dependency to get the async SQLAlchemy session
async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session
        await session.commit()


