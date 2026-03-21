import { createContext } from "react";

const UserContext = createContext({
    currentUser: null,
    loggedInUser: "Guest",
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export default UserContext;
