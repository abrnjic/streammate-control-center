import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
  subtitle?: string;
}

export function SectionHeader({ title, icon, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
      <div className="flex items-center gap-3">
        {React.cloneElement(icon as React.ReactElement, { className: 'text-primary w-6 h-6' })}
        <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
      </div>
      {subtitle && <div className="text-xs font-mono text-slate-500">{subtitle}</div>}
    </div>
  );
}
