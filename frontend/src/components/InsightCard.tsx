import React from "react";

interface InsightCardProps {
  headline: string;
  children: React.ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ headline, children }) => (
  <div className="bg-gray-50 border-l-4 border-blue-600 rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-6 mt-8">
    <div className="flex-1">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2 font-serif">{headline}</h2>
      <div className="text-gray-600 text-sm mb-4">Wayne Enterprises Data Insight</div>
    </div>
    <div className="flex-1 flex items-center justify-center min-h-[200px]">{children}</div>
  </div>
);

export default InsightCard; 