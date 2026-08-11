from app.database.connection import engine, Base

from app.models.user import User
from app.models.incident import Incident

Base.metadata.create_all(bind=engine)

print(Base.metadata.tables.keys())
print("Database Created Successfully")