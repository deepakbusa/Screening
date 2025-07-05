import React from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, children }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col">
    <div className="mb-2">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    <div className="flex-1 flex items-center justify-center min-h-[250px]">{children}</div>
  </div>
);

export default ChartCard; 