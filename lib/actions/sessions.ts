import rpc from '../rpc';
import {keys} from '../utils/object';
import findBySession from '../utils/term-groups';
import {
  SESSION_ADD,
  SESSION_RESIZE,
  SESSION_REQUEST,
  SESSION_ADD_DATA,
  SESSION_PTY_DATA,
  SESSION_PTY_EXIT,
  SESSION_USER_EXIT,
  SESSION_SET_ACTIVE,
  SESSION_CLEAR_ACTIVE,
  SESSION_USER_DATA,
  SESSION_SET_XTERM_TITLE,
  SESSION_SEARCH,
  SESSION_SEARCH_CLOSE
} from '../constants/sessions';
import {webtermState, session, webtermDispatch, webtermActions} from '../hyper';

export function addSession({uid, shell, pid, cols, rows, splitDirection, activeUid}: session) {
  return (dispatch: webtermDispatch, getState: () => webtermState) => {
    const {sessions} = getState();
    const now = Date.now();
    dispatch({
      type: SESSION_ADD,
      uid,
      shell,
      pid,
      cols,
      rows,
      splitDirection,
      activeUid: activeUid ? activeUid : sessions.activeUid,
      now
    });
  };
}

export function requestSession() {
  return (dispatch: webtermDispatch, getState: () => webtermState) => {
    dispatch({
      type: SESSION_REQUEST,
      effect: () => {
        const {ui} = getState();
        // the cols and rows from preview session maybe not accurate. so remove.
        const {/*cols, rows,*/ cwd} = ui;
        rpc.emit('new', {cwd});
      }
    });
  };
}

export function addSessionData(uid: string, data: string) {
  return (dispatch: webtermDispatch) => {
    dispatch({
      type: SESSION_ADD_DATA,
      data,
      effect() {
        const now = Date.now();
        dispatch({
          type: SESSION_PTY_DATA,
          uid,
          data,
          now
        });
      }
    });
  };
}

function createExitAction(type: typeof SESSION_USER_EXIT | typeof SESSION_PTY_EXIT) {
  return (uid: string) => (dispatch: webtermDispatch, getState: () => webtermState) => {
    return dispatch({
      type,
      uid,
      effect() {
        if (type === SESSION_USER_EXIT) {
          rpc.emit('exit', {uid});
        }

        const sessions = keys(getState().sessions.sessions);
        if (sessions.length === 0) {
          window.close();
        }
      }
    } as webtermActions);
  };
}

// we want to distinguish an exit
// that's UI initiated vs pty initiated
export const userExitSession = createExitAction(SESSION_USER_EXIT);
export const ptyExitSession = createExitAction(SESSION_PTY_EXIT);

export function setActiveSession(uid: string) {
  return (dispatch: webtermDispatch) => {
    dispatch({
      type: SESSION_SET_ACTIVE,
      uid
    });
  };
}

export function clearActiveSession(): webtermActions {
  return {
    type: SESSION_CLEAR_ACTIVE
  };
}

export function setSessionXtermTitle(uid: string, title: string): webtermActions {
  return {
    type: SESSION_SET_XTERM_TITLE,
    uid,
    title
  };
}

export function resizeSession(uid: string, cols: number, rows: number) {
  return (dispatch: webtermDispatch, getState: () => webtermState) => {
    const {termGroups} = getState();
    const group = findBySession(termGroups, uid)!;
    const isStandaloneTerm = !group.parentUid && !group.children.length;
    const now = Date.now();
    dispatch({
      type: SESSION_RESIZE,
      uid,
      cols,
      rows,
      isStandaloneTerm,
      now,
      effect() {
        rpc.emit('resize', {uid, cols, rows});
      }
    });
  };
}

export function onSearch(uid?: string) {
  return (dispatch: webtermDispatch, getState: () => webtermState) => {
    const targetUid = uid || getState().sessions.activeUid!;
    dispatch({
      type: SESSION_SEARCH,
      uid: targetUid
    });
  };
}

export function closeSearch(uid?: string, keyEvent?: any) {
  return (dispatch: webtermDispatch, getState: () => webtermState) => {
    const targetUid = uid || getState().sessions.activeUid!;
    if (getState().sessions.sessions[targetUid]?.search) {
      dispatch({
        type: SESSION_SEARCH_CLOSE,
        uid: targetUid
      });
    } else {
      if (keyEvent) {
        keyEvent.catched = false;
      }
    }
  };
}

export function sendSessionData(uid: string | null, data: any, escaped?: boolean | null) {
  return (dispatch: webtermDispatch, getState: () => webtermState) => {
    dispatch({
      type: SESSION_USER_DATA,
      data,
      effect() {
        // If no uid is passed, data is sent to the active session.
        const targetUid = uid || getState().sessions.activeUid;

        rpc.emit('data', {uid: targetUid, data, escaped});
      }
    });
  };
}
