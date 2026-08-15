import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setProfile(res.data.user);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-800 font-medium">{profile.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-gray-800 font-medium capitalize">{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;