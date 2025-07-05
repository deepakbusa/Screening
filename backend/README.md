# Wayne Enterprises BI Backend

FastAPI backend for the Wayne Enterprises Business Intelligence Dashboard.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Interactive API Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Available Endpoints

### Financial Data
- **GET** `/api/financial/` - Get financial data for all divisions
- Returns revenue, costs, profits, employee count, R&D investment, market share, and customer satisfaction

### HR Analytics
- **GET** `/api/hr/` - Get HR analytics data
- Returns retention rates, training hours, performance ratings, diversity index, and employee satisfaction

### R&D Portfolio
- **GET** `/api/rnd/` - Get R&D project portfolio data
- Returns project details, budgets, timeline adherence, patent applications, and commercialization potential

### Security Operations
- **GET** `/api/security/` - Get security operations data
- Returns incident counts, response times, safety scores, and crime prevention effectiveness by district

## Data Sources

All data is loaded from CSV files in the `data/` directory:
- `wayne_financial_data.csv` - Financial metrics by division and quarter
- `wayne_hr_analytics.csv` - HR metrics by department and employee level
- `wayne_rd_portfolio.csv` - R&D project portfolio details
- `wayne_security_data.csv` - Security operations by district and date

## Project Structure

```
backend/
├── main.py              # FastAPI app configuration
├── requirements.txt     # Python dependencies
├── routers/            # API route handlers
│   ├── financial.py
│   ├── hr.py
│   ├── rnd.py
│   └── security.py
├── models/             # Pydantic data models
│   ├── financial.py
│   ├── hr.py
│   ├── rnd.py
│   └── security.py
└── data/               # CSV data files
    ├── wayne_financial_data.csv
    ├── wayne_hr_analytics.csv
    ├── wayne_rd_portfolio.csv
    └── wayne_security_data.csv
``` 