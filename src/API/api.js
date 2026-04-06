import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// fetch data Old axios with useState and useEffect
export const fetchPostsOld = () => {
  return api.get("/posts");
};

export const fetchPostsRQ = async () => {
  const res = await api.get("/posts");
  return res.status === 200 ? res.data : [];
};
