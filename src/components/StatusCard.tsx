import React, { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
  bg: string;
}

export function StatusCard({ title, value, icon, color, bg }: StatusCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all shadow-lg shadow-black/20 group flex flex-col justify-between">
      <div className={`p-3 rounded-lg w-fit ${bg} ${color} mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
        <p className={`text-xl font-bold truncate ${color}`}>{value}</p>
      </div>
    </div>
  );
}
