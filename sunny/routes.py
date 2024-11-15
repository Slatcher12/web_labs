from fastapi import FastAPI, Depends, HTTPException
from fastapi import Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from contextlib import asynccontextmanager
from enum import Enum
from sqlalchemy.sql import or_
from fastapi.middleware.cors import CORSMiddleware


from schemas import Destination, DestinationBase, DestinationsTotalPrice
from models import Destination as DestinationModel
from database import get_db
from typing import List
from database import engine
from database import Base


async def on_startup():
    async with engine.begin() as conn:
        # Create all tables based on the models in the Base
        await conn.run_sync(Base.metadata.create_all)


async def on_shutdown():
    pass


@asynccontextmanager
async def lifespan(app_: FastAPI):
    await on_startup()
    yield
    await on_shutdown()


app = FastAPI(prefix="/api", tags=["api"], lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    **{
        "allow_origins": ["*"],
        "allow_credentials": True,
        "allow_methods": ["*"],
        "allow_headers": ["*"]
    }
)


class OrderClause(str, Enum):
    PRICE = "price"
    NAME = "name"


@app.get("/destinations", response_model=List[Destination])
async def get_destinations(
        search: str = Query(default=None),
        order_by: OrderClause = Query(default=None),
        db_session: AsyncSession = Depends(get_db)
) -> List[Destination]:
    query = select(DestinationModel)
    if search:
        search_term = f"%{search}%"
        query = query.where(
            or_(
                DestinationModel.name.ilike(search_term),
                DestinationModel.description.ilike(search_term)
            )
        )
    if order_by:
        if order_by == OrderClause.PRICE:
            query = query.order_by(DestinationModel.price)
        elif order_by == OrderClause.NAME:
            query = query.order_by(DestinationModel.name)
    result = await db_session.execute(query)
    destinations = result.scalars().all()
    return destinations


@app.get("/destinations/sum_total")
async def sum_price(
        destination_ids: List[int] = Query(),
        db_session: AsyncSession = Depends(get_db)
) -> DestinationsTotalPrice:
    query = select(DestinationModel).where(DestinationModel.destination_id.in_(destination_ids))
    result = await db_session.execute(query)
    destinations = result.scalars().all()
    return {"total_price": sum([destination.price for destination in destinations])}


@app.post("/destinations", response_model=Destination)
async def create_destination(
        destination_base: DestinationBase,
        db_session: AsyncSession = Depends(get_db)
) -> Destination:
    new_destination = DestinationModel(**destination_base.dict())
    db_session.add(new_destination)
    await db_session.commit()
    await db_session.refresh(new_destination)  # Refresh to get the generated ID
    return new_destination


@app.delete("/destinations/{destination_id}", response_model=str)
async def delete_destination(
        destination_id: int,
        db_session: AsyncSession = Depends(get_db)
) -> str:
    query = select(DestinationModel).where(DestinationModel.destination_id == destination_id)
    result = await db_session.execute(query)
    destination = result.scalar_one_or_none()

    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")

    await db_session.delete(destination)
    await db_session.commit()

    return "Destination deleted successfully"


@app.put("/destinations/{destination_id}", response_model=Destination)
async def update_destination(
        destination_id: int,
        destination_base: DestinationBase,
        db_session: AsyncSession = Depends(get_db)
) -> Destination:
    query = select(DestinationModel).where(DestinationModel.destination_id == destination_id)
    result = await db_session.execute(query)
    destination = result.scalar_one_or_none()

    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")

    # Update the destination's details
    for key, value in destination_base.dict().items():
        setattr(destination, key, value)

    await db_session.commit()
    await db_session.refresh(destination)

    return destination


