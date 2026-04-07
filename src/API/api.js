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

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "Title updated!" });
};

export const fetchUsers = async ({ pageParam = 1 }) => {
  console.log(pageParam);
  const res = await api.get(
    `https://api.github.com/users?per_page=10&page=${pageParam}`
  );

  return res.data;
};

export const fetchPostInfinite = async ({ pageParam = 0 }) => {
  console.log(pageParam);
  const res = await api.get(`/posts?_start=${pageParam}&_limit=10`);

  return res.status === 200 ? res.data : [];
};
