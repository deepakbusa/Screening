from pydantic import BaseModel
from typing import List

class RNDRecord(BaseModel):
    Project_ID: str
    Project_Name: str
    Division: str
    Start_Date: str
    Status: str
    Budget_Allocated_M: float
    Budget_Spent_M: float
    Research_Category: str
    Patent_Applications: int
    Commercialization_Potential: str
    Timeline_Adherence_Pct: float
    Lead_Scientist: str
    Security_Classification: str

class RNDData(BaseModel):
    records: List[RNDRecord]
    summary: dict 