import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { calculateEngagementRate, generateMockStatHistory } from "@/utils/dataHelpers";
import { EngagementChart } from "@/components/EngagementChart";
import { AudienceDemographics, AudienceActivity } from "@/components/AudienceDashboard";
import { SaveToListMenu } from "@/components/SaveToListMenu";
import { ArrowLeft, Users, TrendingUp, Grid, ThumbsUp, MessageSquare, Activity, ExternalLink } from "lucide-react";

type ProfileState = 
  | { status: 'loading' }
  | { status: 'success'; data: ProfileDetailResponse }
  | { status: 'error'; error: string };

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  useEffect(() => {
    if (!username) {
      setState({ status: 'error', error: 'Invalid profile' });
      return;
    }

    setState({ status: 'loading' });
    loadProfileByUsername(username)
      .then((data) => {
        if (data) {
          setState({ status: 'success', data });
        } else {
          setState({ status: 'error', error: `Could not load profile details for ${username}` });
        }
      })
      .catch((err) => {
        setState({ status: 'error', error: err.message || 'An error occurred' });
      });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (state.status === 'loading') {
    return (
      <Layout>
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to search
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden max-w-4xl">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
          <div className="animate-pulse">
            <div className="flex gap-6 mb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-2xl"></div>
              <div className="flex-1 space-y-4 py-2">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-3 pt-2">
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-28 bg-gray-50 border border-gray-100 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (state.status === 'error') {
    return (
      <Layout>
        <p className="text-red-600 mb-4">{state.error}</p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = state.data.data.user_profile;
  const history = user.stat_history || generateMockStatHistory(user);

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>
      </div>

      <div 
        className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm w-full"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
          <img
            src={user.picture}
            alt={`${user.username} profile`}
            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-sm border border-gray-100"
          />
          <div className="flex-1 pt-2">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                {user.fullname || user.username}
                <VerifiedBadge verified={user.is_verified} />
              </h1>
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md capitalize flex items-center gap-1 border border-gray-200">
                {platform}
              </span>
            </div>
            
            <p className="text-gray-600 text-lg mb-6 max-w-2xl leading-relaxed">
              {user.description ? user.description : `Check out ${user.fullname || user.username}'s profile on ${platform}.`}
            </p>

            <div className="flex items-center gap-3">
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4338CA] transition-colors shadow-sm"
                >
                  View on platform <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <SaveToListMenu username={user.username} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-10 w-full">
          {/* Stats Container - Left Side */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Influencer Stats</h3>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 h-full">
              <StatCard title="Followers" value={formatFollowers(user.followers)} icon={<Users className="w-5 h-5 text-gray-400" />} />
              <StatCard title="Engagement Rate" value={formatEngagementRate(calculateEngagementRate(user))} icon={<TrendingUp className="w-5 h-5 text-gray-400" />} />
              <StatCard title="Posts" value={user.posts_count?.toString() || "-"} icon={<Grid className="w-5 h-5 text-gray-400" />} />
              <StatCard title="Avg Likes" value={user.avg_likes ? formatFollowers(user.avg_likes) : "-"} icon={<ThumbsUp className="w-5 h-5 text-gray-400" />} />
              <StatCard title="Avg Comments" value={user.avg_comments ? formatFollowers(user.avg_comments) : "-"} icon={<MessageSquare className="w-5 h-5 text-gray-400" />} />
              <StatCard title="Engagements" value={user.engagements ? formatFollowers(user.engagements) : "-"} icon={<Activity className="w-5 h-5 text-gray-400" />} />
            </div>
          </div>
          
          {/* Demographics Container - Right Side */}
          <div className="w-full lg:w-5/12 flex flex-col">
            {user.audience && <AudienceDemographics audience={user.audience} />}
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Audience Growth</h3>
          <EngagementChart statHistory={history} />
        </div>

        {user.audience && <AudienceActivity audience={user.audience} />}
      </div>
    </Layout>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl flex flex-col justify-between hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
