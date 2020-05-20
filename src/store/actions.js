const actions = {
  addToCart(context, payload) {
    const oldGood = context.state.cartList.find(
      (item) => item.iid === payload.iid
    );
    if (oldGood) {
      context.commit("addCounter", oldGood);
    } else {
      context.commit("addToCart", payload);
    }
  },
};

export default actions;
