from fastapi import APIRouter
from models.security import SecurityData, SecurityRecord
import pandas as pd
import os

router = APIRouter()

@router.get("/", response_model=SecurityData)
def get_security_data():
    data_path = os.path.join(os.path.dirname(__file__), '../data/wayne_security_data.csv')
    df = pd.read_csv(data_path)
    
    # Convert DataFrame to list of records
    records = []
    for _, row in df.iterrows():
        record = SecurityRecord(
            Date=row['Date'],
            District=row['District'],
            Security_Incidents=row['Security_Incidents'],
            Response_Time_Minutes=row['Response_Time_Minutes'],
            Wayne_Tech_Deployments=row['Wayne_Tech_Deployments'],
            Public_Safety_Score=row['Public_Safety_Score'],
            Infrastructure_Investments_M=row['Infrastructure_Investments_M'],
            Crime_Prevention_Effectiveness_Pct=row['Crime_Prevention_Effectiveness_Pct'],
            Community_Engagement_Events=row['Community_Engagement_Events'],
            Employee_Safety_Index=row['Employee_Safety_Index']
        )
        records.append(record)
    
    # Calculate summary statistics
    summary = {
        "total_incidents": int(df['Security_Incidents'].sum()),
        "avg_response_time": float(df['Response_Time_Minutes'].mean()),
        "avg_safety_score": float(df['Public_Safety_Score'].mean()),
        "total_investments": float(df['Infrastructure_Investments_M'].sum()),
        "avg_crime_prevention": float(df['Crime_Prevention_Effectiveness_Pct'].mean()),
        "total_tech_deployments": int(df['Wayne_Tech_Deployments'].sum()),
        "districts": df['District'].unique().tolist()
    }
    
    return SecurityData(records=records, summary=summary) 