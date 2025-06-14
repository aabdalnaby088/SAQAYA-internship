import { createStore } from "vuex";

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

export const store = createStore({
  state: initialState,
  mutations: {
    increment(state: State) {
      state.count++;
    },
  },
  getters: {
    doubleCount(state: State) {
      return state.count * 2;
    },
  },
});
