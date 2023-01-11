import React, { useEffect, useState } from "react";
import { getUser } from "../api";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  let { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      getUser(id)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          alert("Data not found");
        });
    }
  }, []);

  return (
    <div>
      {/* <div>
        <a href="/">Go Back</a>
      </div> */}
      <div className="d-flex justify-content-start container">
        <div className="row m-2">
          <div className=" left col-sm -6">
            <img className="dp" src={user.avatar_url} />
          </div>
          <div className="col-sm-6">
            <div>
              <div className="mt-5">
                <h4>{user.name}</h4>
                <p>
                  {id}
                  <br />
                  {user.bio}
                  <br />
                  {user.company}
                </p>
              </div>
              <br />
              <div className="d-flex">
                <NavLink
                  to={"repos/1"}
                  className={({ isActive }) =>
                    isActive ? "link text-primary" : "link text-secondary"
                  }
                >
                  <p className="me-4">
                    {user.public_repos}
                    <br />
                    Repos
                  </p>
                </NavLink>
                <NavLink
                  to="followers/1"
                  className={({ isActive }) =>
                    isActive ? "link text-primary" : "link text-secondary"
                  }
                >
                  <p className="me-4">
                    {user.followers}
                    <br />
                    Followers
                  </p>
                </NavLink>
                <NavLink
                  to={"following/1"}
                  className={({ isActive }) =>
                    isActive ? "link text-primary" : "link text-secondary"
                  }
                >
                  <p className="me-4">
                    {user.following}
                    <br />
                    Following
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <Outlet context={{ ...user }} />
      </div>
    </div>
  );
};

export default User;
