import rpc from '../rpc';
import {INIT} from '../constants';
import {webtermDispatch} from '../hyper';

export default function init() {
  return (dispatch: webtermDispatch) => {
    dispatch({
      type: INIT,
      effect: () => {
        rpc.emit('init', null);
      }
    });
  };
}
