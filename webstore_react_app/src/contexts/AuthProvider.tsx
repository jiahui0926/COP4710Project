import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../constants/routes";

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
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to homepage if user is not signed in, expect if user is on sign up or login page
  useEffect(() => {
    const noRedirectPaths: String[] = [
      ROUTE_PATHS.Home,
      ROUTE_PATHS.Login,
      ROUTE_PATHS.SignUp,
    ];
    const currentPath = location.pathname;
    if (!signedIn && !noRedirectPaths.includes(currentPath)) {
      navigate(ROUTE_PATHS.Home);
    } else if (
      signedIn &&
      noRedirectPaths.includes(currentPath) &&
      currentPath != ROUTE_PATHS.Home
    ) {
      navigate(ROUTE_PATHS.Home);
    }
  }, [signedIn, navigate]);

  useEffect(() => {
    if (userID == "" || userID == undefined) {
      signOut();
    }
  }, [userID]);

  // Function to sign user in
  const signIn = (userName: string, userID: string, isASeller: boolean) => {
    setSignedIn(true);
    setUserName(userName);
    setUserID(userID);
    setIsASeller(isASeller);
  };

  // Function to sign user out
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
