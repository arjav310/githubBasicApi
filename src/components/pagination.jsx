import React from "react";
import { useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";

const Pagination = ({ data, type }) => {
  const userData = useOutletContext();
  let { page } = useParams();
  const totalPages = data.total_count / 10;

  const pageNumbers = [];

  for (
    let i = 1;
    i <=
    Math.ceil(
      totalPages ??
        (type == "followers" ? userData.followers : userData.following)
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination container">
        <li className={page <= 1 ? "page-item pg__prev" : "page-item"}>
          <Link to={`../${type}/${page - 1}`} className="page-link">
            Previous
          </Link>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              to={`../${type}/${number}`}
              replace={true}
              className="page-link"
            >
              {number}
            </Link>
          </li>
        ))}
        <li
          className={
            page >= data.total_count / 10 ? "page-item pg__prev" : "page-item"
          }
        >
          <Link to={`../${type}/${++page}`} className="page-link">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
