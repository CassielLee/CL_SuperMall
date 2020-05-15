import request from "@/utils/request.js";
const BASE_URL = "http://123.207.32.32:8000";

export async function getHomeMultidata() {
  return request(`${BASE_URL}/home/multidata`);
}

export async function getHomeGoods(type, page) {
  return request(`${BASE_URL}/home/data?type=${type}&page=${page}`);
}
