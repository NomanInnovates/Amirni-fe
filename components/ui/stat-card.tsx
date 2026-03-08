import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow min-w-0">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`bg-gradient-to-r ${color} p-3 rounded-lg text-white shrink-0`}
        >
          <Icon size={24} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1 break-words">
        {title}
      </h3>
      <p className="text-2xl font-bold text-foreground break-words">{value}</p>
    </div>
  );
}
