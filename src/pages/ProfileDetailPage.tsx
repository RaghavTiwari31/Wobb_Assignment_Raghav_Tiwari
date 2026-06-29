import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useStore } from "@/store/useStore";

type ProfileState = 
  | { status: 'loading' }
  | { status: 'success'; data: ProfileDetailResponse }
  | { status: 'error'; error: string };

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  
  const [state, setState] = useState<ProfileState>({ status: 'loading' });
  const { savedProfiles, addProfileToList, removeProfileFromList } = useStore();

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
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading...</p>
      </Layout>
    );
  }

  if (state.status === 'error') {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">{state.error}</p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = state.data.data.user_profile;
  const isSaved = savedProfiles.includes(user.username);

  const toggleSave = () => {
    if (isSaved) {
      removeProfileFromList(user.username);
    } else {
      addProfileToList(user.username);
    }
  };

  return (
    <Layout title={user.fullname}>
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block hover:underline">
        ← Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <img
          src={user.picture}
          alt={`${user.username} profile`}
          className="w-24 h-24 rounded-full border border-gray-200 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold flex items-center gap-1">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-600 font-medium">{user.fullname}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Platform: {platform}</p>

          {user.description && (
            <p className="mt-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{user.description}</p>
          )}

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Followers</div>
              <div className="font-semibold text-lg">
                {formatFollowers(user.followers)}
              </div>
            </div>
            <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Engagement Rate</div>
              <div className="font-semibold text-lg">
                {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Posts</div>
                <div className="font-semibold text-lg">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Avg Likes</div>
                <div className="font-semibold text-lg">
                  {formatFollowers(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Avg Comments</div>
                <div className="font-semibold text-lg">{formatFollowers(user.avg_comments)}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Avg Views</div>
                <div className="font-semibold text-lg">
                  {formatFollowers(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Engagements</div>
                <div className="font-semibold text-lg">
                  {formatFollowers(user.engagements)}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
              >
                View on platform →
              </a>
            )}
            
            <button
              onClick={toggleSave}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                isSaved 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {isSaved ? 'Saved to List' : 'Add to List'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
