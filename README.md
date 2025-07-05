# Wayne Enterprises BI Dashboard

A full-stack business intelligence dashboard built with FastAPI backend and Next.js frontend.

## 🏗️ Project Structure

```
Screening/
├── backend/          # FastAPI server
│   ├── main.py      # FastAPI app
│   ├── routers/     # API endpoints
│   ├── models/      # Pydantic models
│   ├── data/        # CSV data files
│   └── requirements.txt
└── frontend/        # Next.js dashboard
    ├── src/
    │   ├── app/     # Dashboard pages
    │   ├── components/ # React components
    │   └── utils/   # API utilities
    └── package.json
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend will run on: http://localhost:8000

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:3000

## 📊 Features

- **Executive Summary**: Key metrics cards
- **6 Interactive Charts**: Financial, HR, R&D, Security data
- **Data Insights**: Newspaper-style insight section
- **Responsive Design**: Tailwind CSS styling
- **Real-time Data**: Live API integration

## 🌐 Deployment

### Backend Deployment (Railway/Render)
- **Root Directory**: `backend/`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend Deployment (Vercel)
- **Root Directory**: `frontend/`
- **Build Command**: `npm run build`
- **Framework Preset**: Next.js

## 📈 API Endpoints

- `GET /api/financial/` - Financial data
- `GET /api/hr/` - HR analytics
- `GET /api/rnd/` - R&D portfolio
- `GET /api/security/` - Security operations

## 🛠️ Tech Stack

- **Backend**: FastAPI, Python, Pandas
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Charts**: Chart.js, react-chartjs-2
- **Data**: CSV files with Wayne Enterprises mock data

## 📝 Environment Variables

For production deployment, set:
- `NEXT_PUBLIC_API_BASE`: Your backend API URL
- `PORT`: Backend port (auto-set by deployment platform) 