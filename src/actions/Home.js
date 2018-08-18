import axios from '../utilities/Axios';
import * as actions from "../constants/ActionTypes";
import * as urls from "../constants/Urls";

export const requestLinks = () => {
    return {
        type: actions.REQUEST_LINKS
    }
}

export const receiveLinks = links => {
    return {
        type: actions.RECEIVE_LINKS,
        links 
    }
}

export function loadLinks() {
    return dispatch => {
      dispatch(requestLinks()); 
      axios.get(urls.GET_ALL, {
          params: {
            collection: "links"
          }
        })
        .then(res => dispatch(receiveLinks(res.data)))
        .catch(console.log);
    };
}
        