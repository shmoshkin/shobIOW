  const initialState = {};
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case 'OPEN_CARD':
        return {
            ...state,
            [action.id]: {
                show: true,
                config: action.config
            }
        }
      case 'CLOSE_CARD':
        return {
            ...state,
            [action.id]: {
                show: false,
                config: action.config
            }
        }
      default:
        return state
    }
  }