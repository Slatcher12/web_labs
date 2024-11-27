from fastapi import FastAPI, Depends, HTTPException
from fastapi import Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from contextlib import asynccontextmanager
from enum import Enum
from sqlalchemy.sql import or_
from fastapi.middleware.cors import CORSMiddleware


from schemas import Destination, DestinationBase, DestinationsTotalPrice, CartItem
from models import Destination as DestinationModel
from database import get_db
from typing import List, Optional, Dict
from database import engine
from database import Base
from datetime import datetime
from pytz import UTC


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
        price_le: Optional[int] = Query(default=None),
        country: Optional[str] = Query(default=None),
        rate_ge: Optional[float] = Query(default=None),
        order_by: OrderClause = Query(default=OrderClause.PRICE),
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
    if price_le:
        query = query.where(DestinationModel.price <= price_le)
    if country:
        query = query.where(DestinationModel.country == country)
    if rate_ge:
        query = query.where(DestinationModel.rate >= rate_ge)
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
        destination_ids: Optional[List[int]] = Query(),
        db_session: AsyncSession = Depends(get_db)
) -> DestinationsTotalPrice:
    query = select(DestinationModel).where(DestinationModel.destination_id.in_(destination_ids))
    result = await db_session.execute(query)
    destinations = result.scalars().all()
    return {"total_price": sum([destination.price for destination in destinations])}

@app.get("/destinations/{destination_id}", response_model=Destination)
async def get_destination(
        destination_id: int,
        db_session: AsyncSession = Depends(get_db)
) -> Destination:
    query = select(DestinationModel).where(DestinationModel.destination_id == destination_id)
    result = await db_session.execute(query)
    destination = result.scalar_one_or_none()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination


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


@app.get("/countries")
async def get_countries(db_session: AsyncSession = Depends(get_db)) -> List[str]:
    query = select(DestinationModel)
    result = await db_session.execute(query)
    destinations = result.scalars().all()
    return list(set([destination.country for destination in destinations]))


cart: List[CartItem] = []


def get_max_cart_item_id() -> int:
    ids = [cart_item.id for cart_item in cart]
    if not ids:
        return 1
    return max(ids) + 1


def check_collision(destination: Destination, quantity, destination_type) -> bool:
    for cart_item in cart:
        if destination == cart_item.destination and destination_type == cart_item.destination_type:
            return True
    return False


@app.get("/cart")
async def get_cart(
) -> List[CartItem]:
    return cart


@app.post("/cart")
async def add_cart(
        destination_id: int = Query(),
        quantity: int = Query(),
        destination_type: str = Query(),
        db_session: AsyncSession = Depends(get_db)
) -> CartItem:
    destination = await get_destination(destination_id, db_session)
    cart_item = CartItem(id=get_max_cart_item_id(), destination=Destination.model_validate(destination), destination_type=destination_type, quantity=quantity)
    for cart_item in cart:
        if cart_item.destination == destination and cart_item.destination_type == destination_type:
            cart_item.quantity += quantity
            break
    else:
        cart.append(cart_item)
    return cart_item


@app.delete("/cart/{item_index}")
async def delete(item_index: int) -> None:
    for cart_item in cart:
        if cart_item.id == item_index:
            cart.remove(cart_item)
            return
    else:
        raise HTTPException(status_code=404, detail="Cart item not found")