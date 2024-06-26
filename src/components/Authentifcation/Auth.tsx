import React, { useState, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input"; // Ensure this is the correct path to your Input component
import { useAuth } from "./AuthProvider";
import logo from "./../../images/logo.png";
import hero from "./../../images/hero.jpg";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface AuthState {
  name: string;
  email: string;
  password: string;
  variant: "login" | "register";
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [authState, setAuthState] = useState<AuthState>({
    name: "",
    email: "",
    password: "",
    variant: "login",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof AuthState
  ) => {
    setAuthState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleGoogleSuccess = (response: any) => {
    console.log("Login Successful!", response);
    navigate("/profile");
  };

  const handleGoogleFailure = (error: any) => {
    console.error("Login Failed!", error);
    if (error.error === "popup_closed_by_user") {
      alert(
        "Login popup was closed before completing the login process. Please try again."
      );
    } else if (error.error) {
      alert(`An error occurred: ${error.error}`);
    } else {
      alert("An error occurred during the login process. Please try again.");
    }
  };

  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&scope=user`;
  };

  const toggleVariant = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      variant: prev.variant === "login" ? "register" : "login",
    }));
  }, []);

  const handleAuthAction = useCallback(async () => {
    const { name, email, password, variant } = authState;

    try {
      if (variant === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      //navigate("/profile");
    } catch (error) {
      console.error(
        `${variant === "login" ? "Login" : "Registration"} failed:`,
        error
      );
    }
  }, [authState, login, register, navigate]);

  return (
    <div
      className="fixed min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src={logo} alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center items-center min-h-screen w-full">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-white text-4xl mb-8 font-semibold">
              {authState.variant === "login" ? "Sign in" : "Register"}
            </h1>
            <div className="flex flex-col gap-4">
              {authState.variant === "register" && (
                <>
                  <label
                    className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    htmlFor="name"
                  >
                    Username
                  </label>
                  <Input
                    label="Username"
                    onChange={(e) => handleInputChange(e, "name")}
                    id="name"
                    value={authState.name}
                  />
                </>
              )}
              <label
                className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                label="Email"
                onChange={(e) => handleInputChange(e, "email")}
                id="email"
                type="email"
                value={authState.email}
              />
              <label
                className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                label="Password"
                onChange={(e) => handleInputChange(e, "password")}
                id="password"
                type="password"
                value={authState.password}
              />
              <button
                onClick={handleAuthAction}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10"
              >
                {authState.variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <button
                  onClick={() => console.log("Login with Google")}
                  className="icon-button"
                  aria-label="Login with Google"
                >
                  <FcGoogle size={30} />
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="icon-button"
                  aria-label="Login with GitHub"
                >
                  <FaGithub size={30} color="white" />
                </button>
              </div>
              <p className="text-neutral-500 mt-12">
                {authState.variant === "login"
                  ? "First time using our service?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {authState.variant === "login"
                    ? "Create an account"
                    : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
