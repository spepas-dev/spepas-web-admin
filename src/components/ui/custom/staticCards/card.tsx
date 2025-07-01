import { LucideIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Card, CardContent } from '../..';

export interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  trend: string;
  trendUp: boolean;
  Icon: LucideIcon;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, trend, trendUp, Icon, color = 'text-[#4A36EC]' }) => (
  <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
          <Icon className={cn('w-5 h-5', color)} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">{description}</p>
        <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>{trend}</span>
      </div>
    </CardContent>
  </Card>
);
