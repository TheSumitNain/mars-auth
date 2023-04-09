import { createContext, useEffect, useState, useContext } from "react";
import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const userauthcontext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return () => {
        unsubscribe();
    }
  }, []);

  return (
    <userauthcontext.Provider
     value={{user, logIn, logOut}}>
    {children}
    </userauthcontext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userauthcontext);
}