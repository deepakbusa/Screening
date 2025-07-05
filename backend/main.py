from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import financial, hr, rnd, security
import os

app = FastAPI(title="Wayne Enterprises BI API")

# Add CORS middleware for both development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://screening-frontend.vercel.app",  # Vercel frontend
        "https://*.vercel.app",  # Any Vercel deployment
        "https://*.railway.app",  # Any Railway deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(financial.router, prefix="/api/financial", tags=["Financial"])
app.include_router(hr.router, prefix="/api/hr", tags=["HR"])
app.include_router(rnd.router, prefix="/api/rnd", tags=["R&D"])
app.include_router(security.router, prefix="/api/security", tags=["Security"])

@app.get("/")
async def root():
    return {"message": "Wayne Enterprises BI API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
