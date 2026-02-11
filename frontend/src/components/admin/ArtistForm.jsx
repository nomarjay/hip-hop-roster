import { useState, useEffect } from "react";
import { createArtist, updateArtist } from "../services/api";
import { X } from "lucide-react";
import React from 'react';


const ArtistForm = ({ artist, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    lyricism: "",
    flow: "",
    creativity: "",
    rhythm: "",
    longevity: "",
    impact: "",
    delivery: "",
    storytelling: "",
    overallTier: "F",
    badges: "",
    profileImageUrl: "",
    active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (artist) {
      setFormData({
        ...artist,
        badges: artist.badges ? artist.badges.join(", ") : "",
      });
    }
  }, [artist]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const dataToSubmit = {
        ...formData,
        badges: formData.badges
          ? formData.badges
              .split(",")
              .map((b) => b.trim())
              .filter((b) => b)
          : [],
      };

      if (artist) {
        await updateArtist(artist.id, dataToSubmit);
      } else {
        await createArtist(dataToSubmit);
      }

      onClose();
    } catch (err) {
      setError("Failed to save artist");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const grades = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F+",
    "F",
    "F-",
  ];
  const tiers = ["S", "A", "B", "C", "D", "F"];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full border border-gray-800 my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {artist ? "Edit Artist" : "Add New Artist"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2 font-semibold">
                Artist Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2 font-semibold">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Overall Tier */}
            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Overall Tier *
              </label>
              <select
                name="overallTier"
                value={formData.overallTier}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required
              >
                {tiers.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats */}
            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Lyricism
              </label>
              <select
                name="lyricism"
                value={formData.lyricism}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Flow
              </label>
              <select
                name="flow"
                value={formData.flow}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Creativity
              </label>
              <select
                name="creativity"
                value={formData.creativity}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Rhythm
              </label>
              <select
                name="rhythm"
                value={formData.rhythm}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Longevity
              </label>
              <select
                name="longevity"
                value={formData.longevity}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Impact
              </label>
              <select
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Delivery
              </label>
              <select
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-semibold">
                Storytelling
              </label>
              <select
                name="storytelling"
                value={formData.storytelling}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Badges */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2 font-semibold">
                Badges (comma-separated)
              </label>
              <input
                type="text"
                name="badges"
                value={formData.badges}
                onChange={handleChange}
                placeholder="e.g., Dictionary, Lyrical Assassin, Rap God"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Profile Image URL */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2 font-semibold">
                Profile Image URL
              </label>
              <input
                type="url"
                name="profileImageUrl"
                value={formData.profileImageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : artist
                  ? "Update Artist"
                  : "Create Artist"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtistForm;
