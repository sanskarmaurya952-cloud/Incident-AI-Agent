from app.database.connection import engine, Base

# Models import karna bahut zaruri hai
from app.models.user import User
from app.models.incident import Incident
from app.models.lesson import Lesson

Base.metadata.create_all(bind=engine)

print("Database Created Successfully")