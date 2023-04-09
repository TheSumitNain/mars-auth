import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRoute2 from "./components/ProtectedRoute2";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import ScrollToTop from "react-scroll-to-top";

const App = () => {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute2>
                <Login />
              </ProtectedRoute2>
            }
          />
        </Routes>
      </UserAuthContextProvider>

      <ScrollToTop
        style={{
          borderRadius: "50%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        smooth
        top="400"
        color="teal"
      />
    </>
  );
};

export default App;
