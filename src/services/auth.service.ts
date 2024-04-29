import axios from "axios";

const API_URL = "http://localhost:5000/api/";
let currentUser: { accessToken?: string } | null = null; // Explicitly define the type

export const register = (name: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

export const login = (name: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      name,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data != null) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("response.data.accessToken was setted");
      }
      console.log("after the if response.data.accessToken");
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
