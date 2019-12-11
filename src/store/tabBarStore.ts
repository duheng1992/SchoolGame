import { observable } from "mobx";

const tabBarStore = observable({
  tabIndex: 0,
  setIndex(index) {
    this.tabIndex = index;
  },
});
export default tabBarStore;
