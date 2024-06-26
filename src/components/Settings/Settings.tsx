import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.css";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Settings: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState("changeEmail");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentEmail = async () => {
      try {
        const response = await axiosInstance.get("/api/user/email");

        setCurrentEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching current email", error);
      }
    };
    fetchCurrentEmail();
  }, []);

  const handleDeleteAccount = async () => {
    // const userConfirmed = window.confirm(
    //   "Are you sure you want to delete your account? This action cannot be undone."
    // );
    // if (!userConfirmed) return;
    // try {
    //   const response = await axiosInstance.delete("/api/user");
    //   alert("Your account has been deleted successfully.");
    //   navigate("/auth");
    // } catch (error) {
    //   console.error("Error deleting account", error);
    //   alert("There was a problem deleting your account. Please try again.");
    // }
  };

  const handleChangeEmail = async () => {
    try {
      const response = await axiosInstance.put("/api/user/email", {
        newEmail,
      });
      const updatedEmail = response.data.email;
      setNewEmail("");
      setCurrentEmail(updatedEmail);
    } catch (error) {
      console.error("Error changing email", error);
      alert("There was a problem changing your email. Please try again.");
    }
  };

  const renderContent = () => {
    switch (selectedAction) {
      case "deleteAccount":
        return (
          <button className="button" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        );
      case "changeEmail":
        return (
          <div className="form-group">
            <p>Current Email: {currentEmail}</p>
            <label htmlFor="new-email">New Email:</label>
            <input
              type="email"
              id="new-email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="button" onClick={handleChangeEmail}>
              Change E-Mail
            </button>
          </div>
        );
      case "changeImage":
        return (
          <div className="form-group">
            <label htmlFor="new-image">New Image:</label>
            <input type="file" id="new-image" />
            <button className="button">Change Image</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="sidebar">
        <button onClick={() => setSelectedAction("changeEmail")}>
          Change Email
        </button>
        <button onClick={() => setSelectedAction("changeImage")}>
          Change Image
        </button>
        <button onClick={() => setSelectedAction("deleteAccount")}>
          Delete Account
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Settings;
