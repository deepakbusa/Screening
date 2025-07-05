from pydantic import BaseModel
from typing import List, Optional

class FinancialRecord(BaseModel):
    Division: str
    Quarter: str
    Year: int
    Revenue_M: float
    Operating_Costs_M: float
    Net_Profit_M: float
    Employee_Count: int
    RD_Investment_M: float
    Market_Share_Pct: Optional[float]
    Customer_Satisfaction_Score: float

class FinancialData(BaseModel):
    records: List[FinancialRecord]
    summary: dict 