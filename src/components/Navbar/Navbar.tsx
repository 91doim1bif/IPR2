import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import useMovieList from "../../hooks/useMovieList";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import axios from "axios";
import Select, { StylesConfig } from "react-select";
import useHistories from "../../hooks/useHistories";

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #CBD5E0",
    borderRadius: 0,
    boxShadow: "none",
    width: "300px", // Adjust width of the search field
    margin: "0 auto", // Center the search field
    minHeight: "auto",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#CBD5E0",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#E2E8F0",
  }),
  input: (provided) => ({
    ...provided,
    color: "#E2E8F0",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#CBD5E0",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent black background
    borderRadius: 0,
    boxShadow: "none",
    color: "#fff", // Set text color to white
  }),
};

const Navbar: React.FC = () => {
  const { histories, isLoading: historiesLoading } = useHistories();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const navigate = useNavigate();
  const { data: movies } = useMovieList();

  const handleScroll = useCallback(() => {
    setShowBackground(window.scrollY > 50);
  }, []);

  const addHistory = async (movieId: string) => {
    if (historiesLoading) {
      return; // Wait until histories are loaded
    }

    // Check if the movie ID already exists in histories
    const movieExists = histories.some((history) => history._id === movieId);

    if (!movieExists) {
      try {
        await axios.post(`http://localhost:3080/api/histories/${movieId}`, {
          movieId,
        });
      } catch (error) {
        console.error("Error adding history:", error);
      }
    }

    // Navigate to watch page after adding to history
    navigate(`/watch/${movieId}`);
  };

  useEffect(() => {
    const profileId = localStorage.getItem("profile");
    if (profileId) {
      axios
        .get(`http://localhost:3080/api/profile/${profileId}`)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        })
        .finally(() => {
          setLoadingProfile(false);
        });
    } else {
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSearchChange = (selectedOption: any) => {
    if (selectedOption) {
      setSearchQuery(""); // Clear search input after selection
      addHistory(selectedOption.value);
    }
  };

  const handleSearchInputChange = (inputValue: string) => {
    const inputValueLower = inputValue.toLowerCase();
    const filteredOptions = movies
      .filter((movie) => movie.title.toLowerCase().includes(inputValueLower))
      .slice(0, 3) // Limitiert die Liste auf die ersten 3 Elemente
      .map((movie) => ({
        value: movie._id,
        label: movie.title,
      }));
    setOptions(filteredOptions);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // Clear search input after submission
  };

  return (
    <nav className="w-full fixed z-40" role="navigation">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img
          className="h-5 lg:h-10 cursor-pointer"
          src={"./images/logo.png"}
          alt="Logo"
          onClick={() => handleNavigation("/home")}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" onClick={() => handleNavigation("/home")} />
          <NavbarItem
            label="Series"
            onClick={() => handleNavigation("/series")}
          />
          <NavbarItem
            label="Films"
            onClick={() => handleNavigation("/films")}
          />
          <NavbarItem
            label="My List"
            onClick={() => handleNavigation("/myList")}
          />
          <div className="flex-1 ml-8">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                <BsSearch />
              </div>
              <Select
                value={options.find((option) => option.value === searchQuery)}
                onInputChange={handleSearchInputChange}
                onChange={handleSearchChange}
                options={options}
                placeholder="Search films..."
                styles={customStyles}
              />
            </form>
          </div>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          {!loadingProfile && profile && (
            <div
              onClick={toggleAccountMenu}
              className="flex flex-row items-center gap-2 cursor-pointer relative"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src={profile.image} alt="Profile" />
              </div>
              <BsChevronDown
                className={`text-white transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
              <AccountMenu visible={showAccountMenu} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
//test
