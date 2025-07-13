import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profile";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getProfile(token);
        setProfile(data);
        setForm({ username: data.username, email: data.email, password: "" });
      } catch (err) {
        setError("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const updateData = {};
      if (form.username !== profile.username) updateData.username = form.username;
      if (form.email !== profile.email) updateData.email = form.email;
      if (form.password) updateData.password = form.password;
      if (Object.keys(updateData).length === 0) {
        setError("No changes to update");
        setLoading(false);
        return;
      }
      const res = await updateProfile(updateData, token);
      setProfile(res.user);
      setForm({ ...form, password: "" });
      setSuccess("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div className="text-center mt-20 text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 text-white flex items-center justify-center text-4xl font-bold shadow-lg ring-4 ring-white/10">
            {profile.username?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-extrabold mt-3">{profile.username}</h1>
          <p className="text-gray-400">{profile.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center my-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xl font-bold text-red-400">{profile.favourites}</div>
            <div className="text-gray-300 text-sm">Favourites</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xl font-bold text-blue-400">{profile.watchlist}</div>
            <div className="text-gray-300 text-sm">Watchlist</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xl font-bold text-yellow-400">{profile.ratings}</div>
            <div className="text-gray-300 text-sm">Ratings</div>
          </div>
        </div>

        {/* Feedback Messages */}
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}
        {success && <div className="text-green-400 text-center mb-4">{success}</div>}

        {/* View or Edit Form */}
        {!editMode ? (
          <div className="text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            <div>
              <label className="block mb-1 font-semibold text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-300">New Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="flex justify-center gap-3 pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setForm({ username: profile.username, email: profile.email, password: "" });
                  setError("");
                  setSuccess("");
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
// This ProfilePage component allows users to view and edit their profile information.
// It fetches the user's profile data, displays it, and provides a form for updating username