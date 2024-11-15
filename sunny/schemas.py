from pydantic import BaseModel
from datetime import datetime
from pydantic import PositiveInt


class DestinationBase(BaseModel):
    name: str
    description: str
    updated_at: datetime
    price: PositiveInt
    picture: str


class Destination(DestinationBase):
    destination_id: int


class DestinationsTotalPrice(BaseModel):
    total_price: int
