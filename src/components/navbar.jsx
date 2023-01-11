import React, { useContext } from "react";
import { getToken, getUsers } from "../api";
import useDebounce from "../components/useDeboune";
import { GlobalContext } from "../components/root";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const globalContext = useContext(GlobalContext);
  const [rerender, setRerender] = useState(false);

  useDebounce(
    () => {
      if (globalContext.query == "") {
        globalContext.setUsers([]);
        return;
      }
      getUsers(globalContext.query)
        .then((res) => {
          globalContext.setUsers(res.data.items);
        })
        .catch((err) => {
          alert("User not found");
        });
    },
    [globalContext.query],
    300
  );

  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_CLIENT_ID
    );
  };

  useEffect(() => {
    const queryStr = window.location.search;
    const urlParams = new URLSearchParams(queryStr);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      getToken(codeParam).then((res) => {
        console.log(res.data);
        if (res.data.access_token) {
          localStorage.setItem("accessToken", res.data.access_token);
          setRerender(!rerender);
        }
      });
    }
  }, []);

  return (
    <nav className=" navbar navbar-expand-lg  navbar-light bg-light">
      <div className="container-fluid">
        <h3 className="me-4">Enter a Github Username</h3>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex me-auto mb-2 mb-lg-0"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              className="form-control me-2"
              type="text"
              placeholder="search"
              value={globalContext.query}
              onChange={(e) => {
                globalContext.setQuery(e.target.value);
              }}
            />
          </form>
          <button
            className="btn btn-login btn-primary text-center"
            onClick={loginWithGithub}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
