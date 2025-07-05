from pydantic import BaseModel
from typing import List

class HRRecord(BaseModel):
    Department: str
    Employee_Level: str
    Date: str
    Retention_Rate_Pct: float
    Training_Hours_Annual: int
    Performance_Rating: float
    Salary_Band: str
    Benefits_Utilization_Pct: float
    Security_Clearance_Level: str
    Internal_Promotions: int
    Diversity_Index: float
    Employee_Satisfaction_Score: float

class HRData(BaseModel):
    records: List[HRRecord]
    summary: dict 