"use client";
import React, { useEffect, useState } from "react";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ChartCard from "../components/ChartCard";
import InsightCard from "../components/InsightCard";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import {
  fetchFinancial,
  fetchHR,
  fetchRND,
  fetchSecurity,
} from "../utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

interface FinancialRecord {
  Division: string;
  Quarter: string;
  Year: number;
  Revenue_M: number;
  Operating_Costs_M: number;
  Net_Profit_M: number;
  Employee_Count: number;
  RD_Investment_M: number;
  Market_Share_Pct?: number;
  Customer_Satisfaction_Score: number;
}

interface FinancialData {
  records: FinancialRecord[];
  summary: {
    total_revenue: number;
    total_profit: number;
    avg_satisfaction: number;
    total_employees: number;
    divisions: string[];
  };
}

interface HRRecord {
  Department: string;
  Employee_Level: string;
  Date: string;
  Retention_Rate_Pct: number;
  Training_Hours_Annual: number;
  Performance_Rating: number;
  Salary_Band: string;
  Benefits_Utilization_Pct: number;
  Security_Clearance_Level: string;
  Internal_Promotions: number;
  Diversity_Index: number;
  Employee_Satisfaction_Score: number;
}

interface HRData {
  records: HRRecord[];
  summary: {
    avg_retention_rate: number;
    avg_satisfaction: number;
    avg_performance: number;
    avg_diversity_index: number;
    total_promotions: number;
    departments: string[];
    employee_levels: string[];
  };
}

interface RNDRecord {
  Project_ID: string;
  Project_Name: string;
  Division: string;
  Start_Date: string;
  Status: string;
  Budget_Allocated_M: number;
  Budget_Spent_M: number;
  Research_Category: string;
  Patent_Applications: number;
  Commercialization_Potential: string;
  Timeline_Adherence_Pct: number;
  Lead_Scientist: string;
  Security_Classification: string;
}

interface RNDData {
  records: RNDRecord[];
  summary: {
    total_projects: number;
    active_projects: number;
    completed_projects: number;
    total_budget_allocated: number;
    total_budget_spent: number;
    avg_timeline_adherence: number;
    total_patents: number;
    divisions: string[];
    research_categories: string[];
  };
}

interface SecurityRecord {
  Date: string;
  District: string;
  Security_Incidents: number;
  Response_Time_Minutes: number;
  Wayne_Tech_Deployments: number;
  Public_Safety_Score: number;
  Infrastructure_Investments_M: number;
  Crime_Prevention_Effectiveness_Pct: number;
  Community_Engagement_Events: number;
  Employee_Safety_Index: number;
}

interface SecurityData {
  records: SecurityRecord[];
  summary: {
    total_incidents: number;
    avg_response_time: number;
    avg_safety_score: number;
    total_investments: number;
    avg_crime_prevention: number;
    total_tech_deployments: number;
    districts: string[];
  };
}

export default function DashboardPage() {
  const [financial, setFinancial] = useState<FinancialData | null>(null);
  const [hr, setHR] = useState<HRData | null>(null);
  const [rnd, setRND] = useState<RNDData | null>(null);
  const [security, setSecurity] = useState<SecurityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchFinancial(),
      fetchHR(),
      fetchRND(),
      fetchSecurity(),
    ])
      .then(([f, h, r, s]) => {
        setFinancial(f);
        setHR(h);
        setRND(r);
        setSecurity(s);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Dashboard data fetch error:', error);
        setError(`Failed to load data: ${error.message}. Please ensure the backend API is running and accessible.`);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">{error}</div>;

  if (!financial || !hr || !rnd || !security) {
    return <div className="p-8 text-center text-red-500">No data available</div>;
  }

  // Financial chart: Revenue by Division (latest year)
  const latestYear = Math.max(...financial.records.map((r: FinancialRecord) => r.Year));
  const revenueByDivision = financial.records
    .filter((r: FinancialRecord) => r.Year === latestYear)
    .reduce((acc: Record<string, number>, r: FinancialRecord) => {
      acc[r.Division] = (acc[r.Division] || 0) + r.Revenue_M;
      return acc;
    }, {});

  // Financial chart: Profit trend (all divisions)
  const profitTrend = financial.records.filter((r: FinancialRecord) => r.Division === "Wayne Aerospace");

  // HR chart: Retention rates by department (latest month)
  const latestHRDate = hr.records[hr.records.length - 1].Date;
  const retentionByDept = hr.records.filter((r: HRRecord) => r.Date === latestHRDate);

  // R&D chart: Budget vs Spending by project (top 5)
  const topRND = rnd.records.slice(0, 5);

  // Security chart: Incidents by district (latest date)
  const latestSecDate = security.records[security.records.length - 1].Date;
  const secByDistrict = security.records.filter((r: SecurityRecord) => r.Date === latestSecDate);

  // Insight: Aerospace R&D drives 40% of 2024 revenue
  const aerospace2024 = financial.records.filter(
    (r: FinancialRecord) => r.Division === "Wayne Aerospace" && r.Year === 2024
  );
  const total2024 = financial.records
    .filter((r: FinancialRecord) => r.Year === 2024)
    .reduce((sum: number, r: FinancialRecord) => sum + r.Revenue_M, 0);
  const aerospaceShare =
    aerospace2024.reduce((sum: number, r: FinancialRecord) => sum + r.Revenue_M, 0) / total2024;

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Wayne Enterprises Executive Dashboard</h1>
      <ExecutiveSummary summary={financial.summary} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Revenue by Division (2024)">
          <Bar
            data={{
              labels: Object.keys(revenueByDivision),
              datasets: [
                {
                  label: "Revenue (M)",
                  data: Object.values(revenueByDivision),
                  backgroundColor: "#2563eb",
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </ChartCard>
        <ChartCard title="Profit Trend - Wayne Aerospace">
          <Line
            data={{
              labels: profitTrend.map((r: FinancialRecord) => `${r.Quarter} ${r.Year}`),
              datasets: [
                {
                  label: "Net Profit (M)",
                  data: profitTrend.map((r: FinancialRecord) => r.Net_Profit_M),
                  borderColor: "#22c55e",
                  backgroundColor: "#bbf7d0",
                  tension: 0.4,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </ChartCard>
        <ChartCard title="HR Retention by Department (Latest)">
          <Bar
            data={{
              labels: retentionByDept.map((r: HRRecord) => r.Department),
              datasets: [
                {
                  label: "Retention Rate (%)",
                  data: retentionByDept.map((r: HRRecord) => r.Retention_Rate_Pct),
                  backgroundColor: "#f59e42",
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </ChartCard>
        <ChartCard title="R&D Budget vs Spending (Top 5 Projects)">
          <Bar
            data={{
              labels: topRND.map((r: RNDRecord) => r.Project_Name),
              datasets: [
                {
                  label: "Budget Allocated (M)",
                  data: topRND.map((r: RNDRecord) => r.Budget_Allocated_M),
                  backgroundColor: "#3b82f6",
                },
                {
                  label: "Budget Spent (M)",
                  data: topRND.map((r: RNDRecord) => r.Budget_Spent_M),
                  backgroundColor: "#f87171",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </ChartCard>
        <ChartCard title="Security Incidents by District (Latest)">
          <Bar
            data={{
              labels: secByDistrict.map((r: SecurityRecord) => r.District),
              datasets: [
                {
                  label: "Incidents",
                  data: secByDistrict.map((r: SecurityRecord) => r.Security_Incidents),
                  backgroundColor: "#6366f1",
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </ChartCard>
    </div>
      <InsightCard headline={`Aerospace R&D drives ${(aerospaceShare * 100).toFixed(1)}% of 2024 revenue`}>
        <Pie
          data={{
            labels: ["Wayne Aerospace", "Other Divisions"],
            datasets: [
              {
                data: [
                  aerospace2024.reduce((sum: number, r: FinancialRecord) => sum + r.Revenue_M, 0),
                  total2024 - aerospace2024.reduce((sum: number, r: FinancialRecord) => sum + r.Revenue_M, 0),
                ],
                backgroundColor: ["#2563eb", "#d1d5db"],
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
        />
      </InsightCard>
    </main>
  );
}
