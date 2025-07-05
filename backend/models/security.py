from pydantic import BaseModel
from typing import List

class SecurityRecord(BaseModel):
    Date: str
    District: str
    Security_Incidents: int
    Response_Time_Minutes: float
    Wayne_Tech_Deployments: int
    Public_Safety_Score: float
    Infrastructure_Investments_M: float
    Crime_Prevention_Effectiveness_Pct: float
    Community_Engagement_Events: int
    Employee_Safety_Index: float

class SecurityData(BaseModel):
    records: List[SecurityRecord]
    summary: dict 