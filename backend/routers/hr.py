from fastapi import APIRouter
from models.hr import HRData, HRRecord
import pandas as pd
import os

router = APIRouter()

@router.get("/", response_model=HRData)
def get_hr_data():
    data_path = os.path.join(os.path.dirname(__file__), '../data/wayne_hr_analytics.csv')
    df = pd.read_csv(data_path)
    
    # Convert DataFrame to list of records
    records = []
    for _, row in df.iterrows():
        record = HRRecord(
            Department=row['Department'],
            Employee_Level=row['Employee_Level'],
            Date=row['Date'],
            Retention_Rate_Pct=row['Retention_Rate_Pct'],
            Training_Hours_Annual=row['Training_Hours_Annual'],
            Performance_Rating=row['Performance_Rating'],
            Salary_Band=row['Salary_Band'],
            Benefits_Utilization_Pct=row['Benefits_Utilization_Pct'],
            Security_Clearance_Level=row['Security_Clearance_Level'],
            Internal_Promotions=row['Internal_Promotions'],
            Diversity_Index=row['Diversity_Index'],
            Employee_Satisfaction_Score=row['Employee_Satisfaction_Score']
        )
        records.append(record)
    
    # Calculate summary statistics
    summary = {
        "avg_retention_rate": float(df['Retention_Rate_Pct'].mean()),
        "avg_satisfaction": float(df['Employee_Satisfaction_Score'].mean()),
        "avg_performance": float(df['Performance_Rating'].mean()),
        "avg_diversity_index": float(df['Diversity_Index'].mean()),
        "total_promotions": int(df['Internal_Promotions'].sum()),
        "departments": df['Department'].unique().tolist(),
        "employee_levels": df['Employee_Level'].unique().tolist()
    }
    
    return HRData(records=records, summary=summary) 