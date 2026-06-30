import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { calculateEngagementRate } from '@/utils/dataHelpers';
import type { StatHistory } from '@/types';

interface EngagementChartProps {
  statHistory?: StatHistory[];
}

export function EngagementChart({ statHistory }: EngagementChartProps) {
  if (!statHistory || statHistory.length === 0) return null;

  // Transform data for chart
  const data = statHistory.map(stat => {
    // If avg_comments is missing from stat history, we assume 0 or rely purely on likes for the trend
    const rawRate = calculateEngagementRate({
      followers: stat.followers,
      avg_likes: stat.avg_likes,
      avg_comments: stat.avg_comments,
    });
    return {
      month: stat.month,
      engagementRate: parseFloat((rawRate * 100).toFixed(2)),
    };
  });

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Historical Engagement Rate</h3>
      <div className="h-72 w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: number | string | ReadonlyArray<number | string> | undefined) => [`${value}%`, 'Engagement Rate']}
            />
            <Bar dataKey="engagementRate" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
