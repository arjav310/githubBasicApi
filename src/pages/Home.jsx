import React, { useContext } from "react";
import { getUsers } from "../api";
import { NavLink } from "react-router-dom";
import useDebounce from "../components/useDeboune";
import { GlobalContext } from "../components/root";
import Navbar from "../components/navbar";

const Home = () => {
  const globalContext = useContext(GlobalContext);
  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className="row">
          {globalContext.users.map((item, index) => (
            <div key={index} className="col-sm-3 p-3">
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.avatar_url}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.login}</h5>
                  <br />
                  <div className="btn btn-sm btn-primary">
                    <NavLink
                      className="link text-white"
                      to={`/user/${item.login}/repos/1`}
                    >
                      View Github Profile
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
