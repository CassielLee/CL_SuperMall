const mutations = {
  addCounter(state, payload) {
    console.log("增加数量：", payload);
    // 检查是否添加过，如果添加过，则数量+1，如果没有则新添加
    payload.count++;
  },
  addToCart(state, payload) {
    payload.count = 1;
    console.log("添加进购物车：", payload);
    state.cartList.push(payload);
  },
};

export default mutations;
