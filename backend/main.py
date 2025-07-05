from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import financial, hr, rnd, security
import os

app = FastAPI(title="Wayne Enterprises BI API")

# Add CORS middleware for both development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://screening-frontend.vercel.app",  # Vercel frontend
        "https://screening-deepakbusa.vercel.app",  # Alternative Vercel domain
        "https://*.vercel.app",  # Any Vercel deployment
        "https://*.railway.app",  # Any Railway deployment
        "*",  # Allow all origins for debugging
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
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

@app.options("/{full_path:path}")
async def options_handler(request: Request, full_path: str):
    """Handle CORS preflight requests"""
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
