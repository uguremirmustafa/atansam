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
    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case ACTIONS.SET_PROVINCE:
      return {
        ...state,
        province: action.payload,
      };
    case ACTIONS.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ACTIONS.SET_CLICKED:
      return {
        ...state,
        clicked: action.payload,
      };
    case ACTIONS.SET_IL:
      return {
        ...state,
        il: action.payload,
      };
    case ACTIONS.OPEN_MODAL:
      return {
        ...state,
        modalOpen: action.payload,
      };

    default:
      break;
  }
};
export default reducers;
