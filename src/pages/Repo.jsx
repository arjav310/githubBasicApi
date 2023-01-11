import React, { useEffect, useState } from "react";
import { getData } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/pagination";

const Repo = ({ type }) => {
  const [data, setData] = useState([]);
  let { id, page } = useParams();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getData(id, type, page)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status == 404) {
          alert("User not found!");
          navigate("/");
        } else {
          alert(err.response.data.message);
        }
        setIsLoading(false);
      });
  }, [id, page]);

  // get current posts(repos)
  const currentPosts = data.items;

  return (
    <div>
      <div className=" repoTable">
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : type != "repos" ? (
          <>
            <div className="container">
              <ul className="list-group">
                {data.length == 0 ? (
                  <div className="text-center"> {"No Data Found"}</div>
                ) : (
                  <>
                    {data.map((item, index) => (
                      <li className="list-group-item" key={index}>
                        {item.name ?? item.login}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <ul className="list-group">
                {data.length == 0 ? (
                  <> {"No Repos Found"}</>
                ) : (
                  <>
                    {currentPosts.map((item, index) => (
                      <li className="list-group-item" key={index}>
                        {item.name ?? item.login}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination data={data} type={type} />
      </div>
    </div>
  );
};

export default Repo;
