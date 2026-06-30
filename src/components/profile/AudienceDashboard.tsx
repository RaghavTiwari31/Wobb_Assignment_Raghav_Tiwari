import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import type { AudienceData } from '@/types';

interface AudienceDashboardProps {
  audience?: AudienceData;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
const GENDER_COLORS = { Male: '#3B82F6', Female: '#EC4899', Other: '#9CA3AF' };

export function AudienceDemographics({ audience }: AudienceDashboardProps) {
  if (!audience) return null;

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Audience Demographics</h3>
      <div className="grid grid-cols-1 gap-4 flex-1">
        {/* Age Demographics */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center">
          <div className="w-1/3 flex flex-col items-center justify-center border-r border-gray-100 pr-4">
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Age Distribution</h4>
          </div>
          <div className="w-2/3 flex items-center pl-4">
            <div className="h-28 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audience.demographics.age}
                    dataKey="percentage"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={45}
                    innerRadius={30}
                    paddingAngle={2}
                  >
                    {audience.demographics.age.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number | string | ReadonlyArray<number | string> | undefined) => [`${val}%`, 'Audience']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center gap-1 w-24">
              {audience.demographics.age.map((item, index) => (
                <div key={item.range} className="flex items-center gap-1.5 text-[10px] text-gray-600 font-medium">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {item.range}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gender Demographics */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center">
          <div className="w-1/3 flex flex-col items-center justify-center border-r border-gray-100 pr-4">
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Gender Split</h4>
          </div>
          <div className="w-2/3 flex items-center pl-4">
            <div className="h-28 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audience.demographics.gender}
                    dataKey="percentage"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={45}
                    innerRadius={30}
                    paddingAngle={2}
                  >
                    {audience.demographics.gender.map((entry) => (
                      <Cell key={`cell-${entry.type}`} fill={GENDER_COLORS[entry.type as keyof typeof GENDER_COLORS] || COLORS[0]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number | string | ReadonlyArray<number | string> | undefined) => [`${val}%`, 'Audience']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center gap-1.5 w-24">
              {audience.demographics.gender.map((item) => (
                <div key={item.type} className="flex items-center gap-1.5 text-[10px] text-gray-600 font-medium whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: GENDER_COLORS[item.type as keyof typeof GENDER_COLORS] || COLORS[0] }}></span>
                  {item.type} ({item.percentage}%)
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Top Locations */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center">
          <div className="w-1/3 flex flex-col items-center justify-center border-r border-gray-100 pr-4">
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Top Locations</h4>
          </div>
          <div className="w-2/3 pl-4">
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={audience.demographics.locations} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4B5563' }} width={65} />
                  <Tooltip cursor={{ fill: '#E5E7EB' }} formatter={(val: number | string | ReadonlyArray<number | string> | undefined) => [`${val}%`, 'Audience']} />
                  <Bar dataKey="percentage" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AudienceActivity({ audience }: AudienceDashboardProps) {
  if (!audience) return null;
  const maxActivity = Math.max(...audience.activity.flatMap(a => a.hours));

  return (
    <div className="mt-8 pt-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Audience Insights & Activity</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interests & Sentiment (Takes up 4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col justify-center">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Audience Interests</h4>
            <div className="flex flex-wrap gap-2">
              {audience.interests.map(interest => (
                <span key={interest} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg border border-blue-100">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col justify-center">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Comment Sentiment</h4>
            <div className="flex flex-col gap-5">
              <div className="flex h-5 w-full rounded-full overflow-hidden shadow-inner">
                <div style={{ width: `${audience.sentiment.positive}%` }} className="bg-green-500" title={`Positive: ${audience.sentiment.positive}%`}></div>
                <div style={{ width: `${audience.sentiment.neutral}%` }} className="bg-gray-300" title={`Neutral: ${audience.sentiment.neutral}%`}></div>
                <div style={{ width: `${audience.sentiment.negative}%` }} className="bg-red-500" title={`Negative: ${audience.sentiment.negative}%`}></div>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <div className="flex items-center gap-2 text-green-700">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span> Positive ({audience.sentiment.positive}%)
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-gray-300"></span> Neutral ({audience.sentiment.neutral}%)
                </div>
                <div className="flex items-center gap-2 text-red-700">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span> Negative ({audience.sentiment.negative}%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Heatmap (Takes up 8/12) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">Activity Patterns</h4>
          <div className="flex flex-col gap-3 h-full justify-center">
            <div className="flex ml-12 mb-2 text-sm text-gray-400 font-bold uppercase justify-between px-2">
              <span>12am</span>
              <span>4am</span>
              <span>8am</span>
              <span>12pm</span>
              <span>4pm</span>
              <span>8pm</span>
            </div>
            {audience.activity.map(row => (
              <div key={row.day} className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-600 w-10 text-right">{row.day}</span>
                <div className="flex-1 flex gap-2.5">
                  {row.hours.map((val, idx) => {
                    const opacity = Math.max(0.1, val / (maxActivity || 1));
                    return (
                      <div 
                        key={idx} 
                        className="flex-1 h-12 rounded-lg bg-[#4F46E5] transition-all hover:scale-105 hover:opacity-100 cursor-pointer shadow-sm"
                        style={{ opacity }}
                        title={`${row.day} block ${idx + 1}: ${val} active`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
