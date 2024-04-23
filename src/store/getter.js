const getters = {
  PageComponentTotal(state) {
    let map = {};
    let list = state.pageData.componentList || [];
    list.forEach(item => {
      let key = item.data.component;
      if (map[key]) {
        map[key] += 1;
      } else {
        map[key] = 1;
      }
    });
    return map;
  }
};

export default Object.assign({}, getters);
