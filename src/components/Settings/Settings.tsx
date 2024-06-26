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
  const [newUserName, setNewUserName] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

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

    const fetchCurrentUsername = async () => {
      try {
        const response = await axiosInstance.get("/api/user/name");
        setCurrentUserName(response.data.user_name);
      } catch (error) {
        console.error("Error fetching current user name", error);
      }
    };

    fetchCurrentEmail();
    fetchCurrentUsername();
  }, []);

  const handleDeleteAccount = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!userConfirmed) return;

    try {
      const response = await axiosInstance.delete("/api/user");
      alert("Your account has been deleted successfully.");
      navigate("/auth");
    } catch (error) {
      console.error("Error deleting account", error);
      alert("There was a problem deleting your account. Please try again.");
    }
  };

  const handleChangeUserName = async () => {
    try {
      const response = await axiosInstance.put("/api/user/name", {
        newUserName,
      });
      setCurrentUserName(response.data.user_name);
      setNewUserName("");
    } catch (error) {
      console.error("Error changing user name", error);
    }
  };

  const handleChangeEmail = async () => {
    try {
      const response = await axiosInstance.put("/api/user/email", {
        newEmail,
      });
      setCurrentEmail(response.data.email);
      setNewEmail("");
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
              className="input-field"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="button" onClick={handleChangeEmail}>
              Change E-Mail
            </button>
          </div>
        );

      case "changeUsername":
        return (
          <div className="form-group">
            <p>Current User Name: {currentUserName}</p>
            <label htmlFor="new-username">New User Name</label>
            <input
              type="text"
              id="new-username"
              className="input-field"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button className="button" onClick={handleChangeUserName}>
              Change User Name
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="sidebar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="back-icon"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          Back
        </button>
        <button
          className="button"
          onClick={() => setSelectedAction("changeEmail")}
        >
          Change Email
        </button>
        <button
          className="button"
          onClick={() => setSelectedAction("changeUsername")}
        >
          Change Username
        </button>

        <button
          className="button"
          onClick={() => setSelectedAction("deleteAccount")}
        >
          Delete Account
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Settings;
