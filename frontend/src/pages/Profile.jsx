import { useFetch } from "../hooks";
import { userApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Profile() {
  const { data, loading, error } = useFetch(() => userApi.getProfile(), ["profile"]);
  const user = data?.data || data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && user && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl glass">
            <p className="text-xs text-gray-400 mb-1">Username</p>
            <p className="text-white font-semibold">{user.name}</p>
          </div>
          <div className="p-6 rounded-2xl glass">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="text-white font-semibold">{user.email}</p>
          </div>
          <div className="p-6 rounded-2xl glass">
            <p className="text-xs text-gray-400 mb-1">Member since</p>
            <p className="text-white font-semibold">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
