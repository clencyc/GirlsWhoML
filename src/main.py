from fastapi import FastAPI
from .endpoints import contributor
from .database import Base, engine

app = FastAPI(
    title="MozDest Backend",
    description="FastAPI + Postgres + Cloudinary",
    version="0.1.0",
)

# Create tables on startup (use Alembic in prod)
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(contributor.router)

@app.get("/")
def root():
    return {"message": "MozDest API – see /docs for Swagger"}