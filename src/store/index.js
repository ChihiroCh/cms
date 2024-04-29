import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getter';
Vue.use(Vuex);
import { Messager, createRandomId } from '@/utils';
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
  componentList: []
};
const store = new Vuex.Store({
  state: {
    dragActive: false,
    curDragComponent: {},
    pageData: JSON.parse(JSON.stringify(emptyPageData)),
    activeComponentId: '',
    h5Height: '', //获取crs高度
    componentsTopList: '', //获取各组件距离顶部的距离
    addComponentIndex: null, // 插入组件的索引值
    setType: 1, //1为页面设置，2为组件设置
    dialogImageVisible: false, //上传弹框显示
    upLoadImgSuccess: null //上传成功回调
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
      message.emit('pageChange', { value: state.pageData });
    },
    setH5Height(state, val) {
      // console.log('object val', val);
      state.h5Height = val.height;
      state.componentsTopList = val.list;
    },
    setAddComponentIndex(state, val) {
      state.addComponentIndex = val;
    },
    setActiveComponentId(state, id) {
      state.activeComponentId = id;
    },
    updateType(state, val) {
      state.setType = val;
    },
    // 向H5页面发送预添加组件
    sendViewIndex(state, index) {
      message.emit('setPreview', index);
    },
    // 向H5页面发送删除预添加组件
    sendViewDeleted() {
      message.emit('deletePreview');
    },
    // 向H5页面发送选中指定项
    setViewActiveId(state, id) {
      message.emit('setActive', id);
    },
    // 页面新增组件方法
    addComponent(state, { index, data }) {
      const component = JSON.parse(JSON.stringify(data));
      // 生成随机ID
      const id = component.data.component + '-' + createRandomId();
      component.id = id;
      if (component.iconClass) {
        delete component.iconClass;
      } // 清除后台使用的图标
      state.pageData.componentList.splice(index, 0, component); // 插入选择的组件
      console.log(id, 'id');
      this.commit('setActiveComponentId', id); // 设置新加入的组件为选中状态
      this.commit('setViewActiveId', id); // 更新H5区域选中状态
      this.commit('updateType', 2); // 更新页面编辑类型为组件
      this.commit('setAddComponentIndex', null); // 重置拖动组件要添加的位置
    },
    deletedComponent() {
      this.commit('setAddComponentIndex', null); // 重置拖动组件要添加的位置
      this.commit('sendViewDeleted');
    },
    editComponent() {},
    // 修改页面数据
    changePageData(state, val) {
      Object.keys(val).forEach(item => {
        state.pageData[item] = val[item];
      });
      this.commit('sendH5Data');
    },
    setDialogImageVisible(state, val) {
      state.dialogImageVisible = val;
    },
    setUpLoadImgSucess(state, val) {
      state.upLoadImgSuccess = val;
    }
  },
  actions: {
    getH5Height({ commit }) {
      message.on('pageHeightChange', data => {
        let height = data.height ? data.height + 72 : 768;
        let list = data.componentsTopList || [];
        commit('setH5Height', { height, list });
      });
      message.on('setActive', data => {
        commit('setActiveComponentId', data);
        commit('updateType', 2);
      });
    },
    sendPageComponent({ commit }, val) {
      let commitObj = {
        add: 'addComponent',
        deleted: 'deletedComponent',
        edit: 'editComponent'
      };
      commitObj[val.type] && commit(commitObj[val.type], val);
      commit('sendH5Data');
    }
  }
  // modules
});

export default store;
