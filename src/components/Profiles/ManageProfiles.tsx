import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AvatarModal from "./AvatarModal"; // Importiere die AvatarModal-Komponente
import NameModal from "./NameModal"; // Importiere die NameModal-Komponente

const ManageProfiles: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );
  const [selectedProfileName, setSelectedProfileName] = useState<string | null>(
    null
  );
  const token = localStorage.getItem("token");

  const avatars = [
    "/images/avatars/4714992_avatar_man_people_person_profile_icon.png",
    "/images/avatars/4715025_avatar_people_person_profile_user_icon.png",
    "/images/avatars/4714994_avatar_people_person_profile_student_icon.png",
    "/images/avatars/4715007_avatar_detective_people_person_profile_icon.png",
    "/images/avatars/4715020_avatar_people_person_profile_user_icon.png",
    "/images/avatars/woman.png",
    // Füge hier weitere Avatare hinzu
  ];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await axios.get("http://localhost:3080/api/profiles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfiles(response.data);
        console.log("Get image");
      } catch (error) {
        console.error("Failed to fetch profiles", error);
        navigate("/auth");
      }
    };

    fetchProfiles();
  }, [navigate]);

  const deleteProfile = async (profileId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3080/api/profiles/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile deleted successfully", response.data);
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile._id !== profileId)
      );
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  const changeProfileAvatar = async (profileId: string, image: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3080/api/profiles/${profileId}/avatar`,
        { image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId
            ? { ...profile, image: response.data.image }
            : profile
        )
      );
    } catch (error) {
      console.error("Failed to change profile avatar", error);
    }
  };

  const changeProfileName = async (profileId: string, name: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3080/api/profiles/${profileId}/name`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId
            ? { ...profile, name: response.data.name }
            : profile
        )
      );
    } catch (error) {
      console.error("Failed to change profile name", error);
    }
  };

  const handleOpenAvatarModal = (profileId: string) => {
    setSelectedProfileId(profileId);
    setShowAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
    setSelectedProfileId(null);
  };

  const handleSelectAvatar = (avatar: string) => {
    if (selectedProfileId) {
      changeProfileAvatar(selectedProfileId, avatar);
    }
    handleCloseAvatarModal();
  };

  const handleOpenNameModal = (profileId: string, currentName: string) => {
    setSelectedProfileId(profileId);
    setSelectedProfileName(currentName);
    setShowNameModal(true);
  };

  const handleCloseNameModal = () => {
    setShowNameModal(false);
    setSelectedProfileId(null);
    setSelectedProfileName(null);
  };

  const handleSaveName = (name: string) => {
    if (selectedProfileId) {
      changeProfileName(selectedProfileId, name);
    }
    handleCloseNameModal();
  };

  return (
    <div className="fixed min-h-screen w-full bg-cover bg-center flex items-center h-full justify-center bg-[#141414]">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Manage Profiles
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              className="group flex flex-col items-center w-44 mx-auto"
            >
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {profile.name}
              </div>
              <div className="flex flex-col items-center mt-2">
                <button
                  onClick={() => handleOpenAvatarModal(profile._id)}
                  className="my-1 bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded w-36"
                >
                  Change Avatar
                </button>
                <button
                  onClick={() => handleOpenNameModal(profile._id, profile.name)}
                  className="my-1 bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded w-36"
                >
                  Change Name
                </button>
                <button
                  onClick={() => deleteProfile(profile._id)}
                  className="my-1 bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded w-36"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/profiles")}
          className="mt-10 bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-3 px-4 border border-white hover:border-transparent rounded"
        >
          Back to Profiles
        </button>
      </div>
      {showAvatarModal && (
        <AvatarModal
          avatars={avatars}
          onClose={handleCloseAvatarModal}
          onSelectAvatar={handleSelectAvatar}
        />
      )}
      {showNameModal && selectedProfileName && (
        <NameModal
          currentName={selectedProfileName}
          onClose={handleCloseNameModal}
          onSave={handleSaveName}
        />
      )}
    </div>
  );
};

export default ManageProfiles;
