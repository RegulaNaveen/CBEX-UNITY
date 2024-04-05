import { OPPORTUNITIES } from '../../constants/types';

const INITIAL_STATE = {
  opportunities: [],
  page: 1,
  total: 0,
  itemsPerPage: 15,
  loading: false,
  filters: {}
};

export default function opportunitiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPPORTUNITIES.SET_OPPORTUNITIES:
      return {
        ...state,
        opportunities: [...action.payload]
      };
    case OPPORTUNITIES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case OPPORTUNITIES.SET_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case OPPORTUNITIES.SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case OPPORTUNITIES.SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case OPPORTUNITIES.SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload
      };
    default:
      return state;
  }
}
