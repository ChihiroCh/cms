import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getter';
Vue.use(Vuex);
import { Messager } from '@/utils';
import { decorateOrigin } from '@/config';

// 创建跨源通信实例
const message = new Messager(decorateOrigin);
// 动态引入module
// const modulePath = require.context('./module/', true, /\.js$/);
// let modules = modulePath.keys().reduce((prev, cru) => {
//   let m = cru.replace(/^\.\/(.*)\.\w+$/, '$1');
//   prev[m] = modulePath(cru).default;
//   return prev;
// }, {});
// modules = Object.assign({}, modules);
// console.dir(modulePath.keys(), 'mod');
// 搭建页面初始化数据
const emptyPageData = {
  id: '',
  name: '页面标题',
  shareDesc: '', // 微信分享文案
  shareImage: '', // 微信分享图片
  backgroundColor: '', // 页面背景颜色
  backgroundImage: '', // 页面背景图片
  backgroundPosition: 'top', // 页面背景位置
  cover: '',
  componentList: []
};
const store = new Vuex.Store({
  state: {
    dragActive: false,
    curDragComponent: {},
    pageData: JSON.parse(JSON.stringify(emptyPageData))
  },
  getters,
  mutations: {
    setDragActive(state, val) {
      state.dragActive = val;
    },
    setCurDragComponent(state, val) {
      state.curDragComponent = val;
    },
    setPageData(state, { data }) {
      state.pageData = data || {};
    },
    sendH5Data(state) {
      message.emit('pageHeightChange', state.pageData);
    }
  },
  actions: {}
  // modules
});

export default store;
