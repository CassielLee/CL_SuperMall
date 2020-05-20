import Toast from "./Toast";

const obj = {};
obj.install = function(Vue) {
  //   console.log("install");
  //  创建组件构造器
  const ToastConstructor = Vue.extend(Toast);
  // 用new的方式，根据组件构造器，创建组件实例对象
  const toast = new ToastConstructor();
  //  将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));
  // 此时toast.$el就是上句话中新建的div，将toast添加到document种
  document.body.appendChild(toast.$el);
  
  Vue.prototype.$toast = toast;
};

export default obj;
