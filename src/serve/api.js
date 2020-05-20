import request from "@/utils/request.js";
const BASE_URL = "http://152.136.185.210:8000/api/n3";

export async function getHomeMultidata() {
  return request(`${BASE_URL}/home/multidata`);
}

export async function getHomeGoods(type, page) {
  return request(`${BASE_URL}/home/data?type=${type}&page=${page}`);
}

export async function getProductDetail(id) {
  return request(`${BASE_URL}/detail?iid=${id}`);
}
export async function getProductRecommend() {
  return request(`${BASE_URL}/recommend`);
}
