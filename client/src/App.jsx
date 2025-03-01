import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./assets/pages/Home";
import SignIn from "./assets/pages/SignIn";
import SignUp from "./assets/pages/SignUp";
import Profile from "./assets/pages/Profile";
import About from "./assets/pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
