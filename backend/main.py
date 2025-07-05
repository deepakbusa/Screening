from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import financial, hr, rnd, security

app = FastAPI(title="Wayne Enterprises BI API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(financial.router, prefix="/api/financial", tags=["Financial"])
app.include_router(hr.router, prefix="/api/hr", tags=["HR"])
app.include_router(rnd.router, prefix="/api/rnd", tags=["R&D"])
app.include_router(security.router, prefix="/api/security", tags=["Security"])
