import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal"; // Ensure this is the correct path to your Modal component

const Profiles: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [isChild, setIsChild] = useState(false);

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

  const addProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await axios.post(
        "http://localhost:3080/api/profiles",
        { name: newProfileName, image: "images/default-blue.jpg", isChild },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfiles(response.data);
      setIsModalOpen(false); // Close modal after adding profile
    } catch (error) {
      console.error("Failed to add profile", error);
    }
  };

  const go = (profile: any) => {
    localStorage.setItem("profile", profile._id);
    navigate(`/home`);
  };

  return (
    <div className="fixed min-h-screen w-full bg-cover bg-center flex items-center h-full justify-center bg-[#141414]">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              onClick={() => go(profile)}
              className="group flex-row w-44 mx-auto"
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
            </div>
          ))}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group flex-row w-44 mx-auto"
          >
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-white text-6xl">+</span>
              </div>
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
              Add Profile
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/manage")}
          className="my-10 mx-80 g-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-3 px-4 border border-white hover:border-transparent rounded"
        >
          Manage Profiles
        </button>
      </div>

      {/* Modal for adding a new profile */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-white text-3xl mb-4">Profil hinzufügen</h2>
        <p className="text-gray-400 mb-4">
          Profil für einen weiteren Netflix-Nutzer hinzufügen.
        </p>
        <div className="flex flex-col items-center">
          <img
            src="images/default-blue.jpg"
            alt="Default Profile"
            className="w-20 h-20 mb-4"
          />
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full mb-4"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
          />
          <label className="text-white flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isChild}
              onChange={(e) => setIsChild(e.target.checked)}
            />
            Kind?
          </label>
          <div className="flex mt-4">
            <button
              onClick={addProfile}
              className="bg-white text-black px-4 py-2 rounded-md mr-4"
            >
              Weiter
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profiles;
