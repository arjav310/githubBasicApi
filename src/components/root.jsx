import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { createContext } from "react";
import Home from "../pages/Home";
import Repo from "../pages/Repo";
import User from "../pages/User";
import { useState } from "react";

const GlobalContext = createContext();

const Root = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <div>
      <GlobalContext.Provider value={{ users, query, setUsers, setQuery }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user/:id" element={<User />}>
              <Route
                exact
                path="repos/:page"
                element={<Repo key={"repos"} type={"repos"} />}
              />
              <Route
                exact
                path="followers/:page"
                element={<Repo key={"followers"} type="followers" />}
              />
              <Route
                exact
                path="following/:page"
                element={<Repo key={"following"} type="following" />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </div>
  );
};

export { Root as default, GlobalContext };
