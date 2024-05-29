import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageProfiles: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const token = localStorage.getItem("token"); // Token aus dem lokalen Speicher abrufen

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
      navigate(0); // Aktualisiere die Seite, um die Änderungen zu speichern
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  return (
    <div className="fixed min-h-screen w-full bg-cover bg-center flex items-center h-full justify-center bg-[#141414]">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Manage Profiles
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          {profiles.map((profile) => (
            <div key={profile._id} className="group flex-row w-44 mx-auto">
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
              <button
                onClick={() => deleteProfile(profile._id)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Delete Profile
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/profiles")}
          className="my-10 mx-80 g-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-3 px-4 border border-white hover:border-transparent rounded"
        >
          Back to Profiles
        </button>
      </div>
    </div>
  );
};

export default ManageProfiles;
