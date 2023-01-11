import axios from "axios";

export const getUsers = (userName) =>
  axios({
    method: "get",
    url: `https://api.github.com/search/users?q=${userName}`,
    headers: {
      Authorization: "Bearer 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",
    },
  });

export const getUser = (userName) =>
  axios({
    method: "get",
    url: `https://api.github.com/users/${userName}`,
    headers: {
      Authorization: "Bearer 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",
    },
  });

export const getData = (userName, type, page) =>
  axios({
    method: "get",
    url:
      type != "repos"
        ? `https://api.github.com/users/${userName}/${type}?per_page=10&page=${page}`
        : `https://api.github.com/search/repositories?q=user:${userName}&per_page=10&page=${page}`,
    headers: {
      Authorization: "Bearer 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",
    },
  });

export const getToken = function (codeParam) {
  const params =
    "?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    "&client_secret=" +
    process.env.REACT_APP_CLIENT_SECRET +
    "&code=" +
    codeParam;

  axios({
    method: "post",
    url: "http://github.com/login/oauth/access_token" + params,
    headers: {
      Accept: "application/json",
    },
  });
};
