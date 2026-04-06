import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// fetch data Old axios with useState and useEffect
export const fetchPostsOld = () => {
  return api.get("/posts?_limit=3");
};

export const fetchPostsRQ = async () => {
  const res = await api.get("/posts?_limit=3");
  return res.status === 200 ? res.data : [];
};

export const fetchPostsRQIndv = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.status === 200 ? res.data : {};
};

export const fetchPostsRQPagination = async (pageNumber) => {
  const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
  return res.status === 200 ? res.data : [];
};
