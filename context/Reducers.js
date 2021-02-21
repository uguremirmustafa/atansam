import ACTIONS from './Actions';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TERCIH:
      return {
        ...state,
        tercihler: [...state.tercihler, action.payload],
      };
    case ACTIONS.DEL_TERCIH:
      let newTercihs = [];
      newTercihs = state.tercihler.filter((user) => user !== action.payload);
      return {
        ...state,
        users: newTercihs,
      };

    default:
      break;
  }
};
export default reducers;
