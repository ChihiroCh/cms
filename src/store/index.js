import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getter';
Vue.use(Vuex);
import { Messager } from '@/utils';
import settings from '@/config';

// 创建跨源通信实例
const message = new Messager(settings.decorateOrigin);
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
  componentList: [],
  h5Height: '', //获取crs高度
  componentsTopList: '', //获取各组件距离顶部的距离
  addComponentIndex: null // 插入组件的索引值
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
      message.emit('pageChange', state.pageData);
    },
    setH5Height(state, val) {
      state.h5Height = val.height;
      state.componentsTopList = val.list;
    },
    setAddComponentIndex(state, val) {
      state.addComponentIndex = val;
    },
    // 向H5页面发送预添加组件
    sendViewIndex(state, index) {
      message.emit('setPreview', index);
    }
  },
  actions: {
    getH5Height({ commit }) {
      message.on('pageHeightChange', data => {
        let height = data.height ? data.height + 72 : 768;
        let list = data.componentsTopList || [];
        console.log('data1111111', data);
        commit('setH5Height', { height, list });
      });
    }
  }
  // modules
});

export default store;
