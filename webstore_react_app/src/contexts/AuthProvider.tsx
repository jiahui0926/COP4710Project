import React, { createContext, useContext, useState, ReactNode } from "react";

// Interface for context items
interface AuthContextType {
  signedIn: boolean;
  userName: string;
  userID: string;
  isASeller: boolean;
  signIn: (userName: string, userID: string, isASeller: boolean) => void;
  signOut: () => void;
}

// Create the context variable
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Returns AuthContext if it is defined
 * @returns An AuthContextType object if it is defined, otherwise throws an error.
 * @throws Error if AuthContext is undefined.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

/**
 * Component to wrap React components and provide AuthContext to all its children
 * @param param0 object containing children prop
 * @returns A React functional component with a global AuthContext for all its children
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [isASeller, setIsASeller] = useState(false);

  // const [userID, setUserID] = useState("f08acce7-b0dd-43ab-9576-91ae3dabe2bb");
  // const [signedIn, setSignedIn] = useState(true);
  // const [userName, setUserName] = useState("David");
  // const [isASeller, setIsASeller] = useState(true);

  const signIn = (userName: string, userID: string, isASeller: boolean) => {
    setSignedIn(true);
    setUserName(userName);
    setUserID(userID);
    setIsASeller(isASeller);
  };

  const signOut = () => {
    setSignedIn(false);
    setUserName("");
    setUserID("");
    setIsASeller(false);
  };

  return (
    <AuthContext.Provider
      value={{ signedIn, userName, userID, isASeller, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
