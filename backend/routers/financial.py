from fastapi import APIRouter
from models.financial import FinancialData, FinancialRecord
import pandas as pd
import os

router = APIRouter()

@router.get("/", response_model=FinancialData)
def get_financial_data():
    data_path = os.path.join(os.path.dirname(__file__), '../data/wayne_financial_data.csv')
    df = pd.read_csv(data_path)
    
    # Convert DataFrame to list of records
    records = []
    for _, row in df.iterrows():
        record = FinancialRecord(
            Division=row['Division'],
            Quarter=row['Quarter'],
            Year=row['Year'],
            Revenue_M=row['Revenue_M'],
            Operating_Costs_M=row['Operating_Costs_M'],
            Net_Profit_M=row['Net_Profit_M'],
            Employee_Count=row['Employee_Count'],
            RD_Investment_M=row['RD_Investment_M'],
            Market_Share_Pct=row['Market_Share_Pct'] if pd.notna(row['Market_Share_Pct']) else None,
            Customer_Satisfaction_Score=row['Customer_Satisfaction_Score']
        )
        records.append(record)
    
    # Calculate summary statistics
    summary = {
        "total_revenue": float(df['Revenue_M'].sum()),
        "total_profit": float(df['Net_Profit_M'].sum()),
        "avg_satisfaction": float(df['Customer_Satisfaction_Score'].mean()),
        "total_employees": int(df['Employee_Count'].sum()),
        "divisions": df['Division'].unique().tolist()
    }
    
    return FinancialData(records=records, summary=summary) 