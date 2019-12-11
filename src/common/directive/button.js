import Vue from 'vue'

Vue.directive('p', {
  bind: handler,
  update: handler,
})

const handler = (el, binding, vnode) => {
  const user = vnode.context.$user
  const code = binding.arg || binding.value
  const prop = binding.modifiers.visible ? 'visible' : 'disabled'
  const value = prop !== 'visible'

  if (code && user && user.codes && !~user.codes.indexOf(code)) {
    const vm = vnode.componentInstance
    if (vm && vm.hasOwnProperty(prop)) {
      const silent = Vue.config.silent
      Vue.config.silent = true // 强行忽略警告
      vm[prop] = value
      Vue.config.silent = silent
    } else {
      if (prop === 'visible') {
        el.classList.add('display-none')
      } else if (prop === 'disabled') {
        el.setAttribute('disabled', true)
        el.classList.add('is-disabled')
      }
    }
  }
}

/** ***************************************************************/
/** ***************************************************************/
/** ***************************************************************/
/** ***************************************************************/

// { /* <sa-button type="primary" v-p:200>操作</sa-button>
// <p v-p:300.visible>操作提示</p> */ }

// Vue.directive('p', {
//   bind: function(el, binding, vnode) {
//     const user = vnode.context.$user
//     const code = binding.arg || binding.value
//     const prop = binding.modifiers.visible ? 'visible' : 'disabled'
//     const value = prop !== 'visible'

//     if (code && user && user.codes && !~user.codes.indexOf(code)) {
//       const vm = vnode.componentInstance
//       if (vm && vm._props.hasOwnProperty(prop)) {
//         const silent = Vue.config.silent
//         const property = Object.getOwnPropertyDescriptor(vm._props, prop)
//         Object.defineProperty(vm._props, prop, { ...property, get() { return value } })
//         Vue.config.silent = true // 强行忽略警告
//         property.set(value) // 触发computed依赖更新
//         Vue.config.silent = silent
//       } else {
//         if (prop === 'visible') {
//           el.classList.add('display-none')
//         } else if (prop === 'disabled') {
//           el.setAttribute('disabled', true)
//           el.classList.add('is-disabled')
//         }
//       }
//     }
//   },
// })

/** ***************************************************************/
/** ***************************************************************/
/** ***************************************************************/
/** ***************************************************************/

// import Vue from 'vue';
// import store from '@/store';
// import {get} from '@/utils';

// // 是否有权限
// const hasPermission = userPermission => {
//     let userPermissionList = Array.isArray(userPermission) ? userPermission : [userPermission];
//     // 当前用户的权限列表
//     let permissionList = get(store, 'getters["user/permission"]', []);
//     return userPermissionList.some(e => permissionList.includes(e));
// };

// // 指令
// Vue.directive('per', {
//     bind: (el, binding, vnode) => {
//         if (!hasPermission(binding.value)) {
//             el.parentNode.removeChild(el);
//         }
//     }
// });

// 全局判断方法
// Vue.prototype.$_has = hasPermission;

// { /* <div v-per="[admin]">
//     admin 可见
//     是否为admin：{{$_has('admin')}}   //true
// <div></div> */ }
