import React from "react";

type Summary = {
  total_revenue: number;
  total_profit: number;
  avg_satisfaction: number;
  total_employees: number;
};

interface ExecutiveSummaryProps {
  summary: Summary;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Total Revenue</span>
        <span className="text-2xl font-bold text-blue-700">{summary.total_revenue.toLocaleString()}M</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Total Profit</span>
        <span className="text-2xl font-bold text-green-700">{summary.total_profit.toLocaleString()}M</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Avg. Satisfaction</span>
        <span className="text-2xl font-bold text-yellow-600">{summary.avg_satisfaction.toFixed(2)}</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-gray-500">Total Employees</span>
        <span className="text-2xl font-bold text-purple-700">{summary.total_employees.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ExecutiveSummary; 