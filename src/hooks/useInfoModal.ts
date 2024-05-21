import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  FC,
} from "react";

interface InfoModalContextProps {
  movieId: string | null;
  setMovieId: (id: string | null) => void;
}

const InfoModalContext = createContext<InfoModalContextProps | undefined>(
  undefined
);

interface InfoModalProviderProps {
  children: ReactNode;
}

export const useInfoModal = () => {
  const context = useContext(InfoModalContext);
  if (!context) {
    throw new Error("useInfoModal must be used within an InfoModalProvider");
  }
  return context;
};

export default useInfoModal;
