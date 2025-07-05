from fastapi import APIRouter
from models.rnd import RNDData, RNDRecord
import pandas as pd
import os

router = APIRouter()

@router.get("/", response_model=RNDData)
def get_rnd_data():
    data_path = os.path.join(os.path.dirname(__file__), '../data/wayne_rd_portfolio.csv')
    df = pd.read_csv(data_path)
    
    # Convert DataFrame to list of records
    records = []
    for _, row in df.iterrows():
        record = RNDRecord(
            Project_ID=row['Project_ID'],
            Project_Name=row['Project_Name'],
            Division=row['Division'],
            Start_Date=row['Start_Date'],
            Status=row['Status'],
            Budget_Allocated_M=row['Budget_Allocated_M'],
            Budget_Spent_M=row['Budget_Spent_M'],
            Research_Category=row['Research_Category'],
            Patent_Applications=row['Patent_Applications'],
            Commercialization_Potential=row['Commercialization_Potential'],
            Timeline_Adherence_Pct=row['Timeline_Adherence_Pct'],
            Lead_Scientist=row['Lead_Scientist'],
            Security_Classification=row['Security_Classification']
        )
        records.append(record)
    
    # Calculate summary statistics
    summary = {
        "total_projects": len(df),
        "active_projects": len(df[df['Status'] == 'Active']),
        "completed_projects": len(df[df['Status'] == 'Completed']),
        "total_budget_allocated": float(df['Budget_Allocated_M'].sum()),
        "total_budget_spent": float(df['Budget_Spent_M'].sum()),
        "avg_timeline_adherence": float(df['Timeline_Adherence_Pct'].mean()),
        "total_patents": int(df['Patent_Applications'].sum()),
        "divisions": df['Division'].unique().tolist(),
        "research_categories": df['Research_Category'].unique().tolist()
    }
    
    return RNDData(records=records, summary=summary) 