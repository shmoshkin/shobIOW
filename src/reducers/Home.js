import * as actions from "../constants/ActionTypes";

const initialState = {
    links: []
  };
  
  export default function(state = initialState, action) {
      switch (action.type) {
        case actions.RECEIVE_LINKS:
          return {
            ...state,
            links: action.links
          }
        default:
          return state
      }
  }
    
    