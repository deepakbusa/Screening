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

export default function DashboardPage() {
  const [financial, setFinancial] = useState<any>(null);
  const [hr, setHR] = useState<any>(null);
  const [rnd, setRND] = useState<any>(null);
  const [security, setSecurity] = useState<any>(null);
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
      .catch((e) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">{error}</div>;

  // Financial chart: Revenue by Division (latest year)
  const latestYear = Math.max(...financial.records.map((r: any) => r.Year));
  const revenueByDivision = financial.records
    .filter((r: any) => r.Year === latestYear)
    .reduce((acc: any, r: any) => {
      acc[r.Division] = (acc[r.Division] || 0) + r.Revenue_M;
      return acc;
    }, {});

  // Financial chart: Profit trend (all divisions)
  const profitTrend = financial.records.filter((r: any) => r.Division === "Wayne Aerospace");

  // HR chart: Retention rates by department (latest month)
  const latestHRDate = hr.records[hr.records.length - 1].Date;
  const retentionByDept = hr.records.filter((r: any) => r.Date === latestHRDate);

  // R&D chart: Budget vs Spending by project (top 5)
  const topRND = rnd.records.slice(0, 5);

  // Security chart: Incidents by district (latest date)
  const latestSecDate = security.records[security.records.length - 1].Date;
  const secByDistrict = security.records.filter((r: any) => r.Date === latestSecDate);

  // Insight: Aerospace R&D drives 40% of 2024 revenue
  const aerospace2024 = financial.records.filter(
    (r: any) => r.Division === "Wayne Aerospace" && r.Year === 2024
  );
  const total2024 = financial.records
    .filter((r: any) => r.Year === 2024)
    .reduce((sum: number, r: any) => sum + r.Revenue_M, 0);
  const aerospaceShare =
    aerospace2024.reduce((sum: number, r: any) => sum + r.Revenue_M, 0) / total2024;

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
              labels: profitTrend.map((r: any) => `${r.Quarter} ${r.Year}`),
              datasets: [
                {
                  label: "Net Profit (M)",
                  data: profitTrend.map((r: any) => r.Net_Profit_M),
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
              labels: retentionByDept.map((r: any) => r.Department),
              datasets: [
                {
                  label: "Retention Rate (%)",
                  data: retentionByDept.map((r: any) => r.Retention_Rate_Pct),
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
              labels: topRND.map((r: any) => r.Project_Name),
              datasets: [
                {
                  label: "Budget Allocated (M)",
                  data: topRND.map((r: any) => r.Budget_Allocated_M),
                  backgroundColor: "#3b82f6",
                },
                {
                  label: "Budget Spent (M)",
                  data: topRND.map((r: any) => r.Budget_Spent_M),
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
              labels: secByDistrict.map((r: any) => r.District),
              datasets: [
                {
                  label: "Incidents",
                  data: secByDistrict.map((r: any) => r.Security_Incidents),
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
                  aerospace2024.reduce((sum: number, r: any) => sum + r.Revenue_M, 0),
                  total2024 - aerospace2024.reduce((sum: number, r: any) => sum + r.Revenue_M, 0),
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
