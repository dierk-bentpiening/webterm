import {createSelector} from 'reselect';

import Header from '../components/header';
import {closeTab, changeTab, maximize, openHamburgerMenu, unmaximize, minimize, close} from '../actions/header';
import {connect} from '../utils/plugins';
import {getRootGroups} from '../selectors';
import {webtermState, webtermDispatch, ITab} from '../hyper';

const isMac = /Mac/.test(navigator.userAgent);

const getSessions = ({sessions}: webtermState) => sessions.sessions;
const getActiveRootGroup = ({termGroups}: webtermState) => termGroups.activeRootGroup;
const getActiveSessions = ({termGroups}: webtermState) => termGroups.activeSessions;
const getActivityMarkers = ({ui}: webtermState) => ui.activityMarkers;
const getTabs = createSelector(
  [getSessions, getRootGroups, getActiveSessions, getActiveRootGroup, getActivityMarkers],
  (sessions, rootGroups, activeSessions, activeRootGroup, activityMarkers) =>
    rootGroups.map((t): ITab => {
      const activeSessionUid = activeSessions[t.uid];
      const session = sessions[activeSessionUid];
      return {
        uid: t.uid,
        title: session.title,
        isActive: t.uid === activeRootGroup,
        hasActivity: activityMarkers[session.uid]
      };
    })
);

const mapStateToProps = (state: webtermState) => {
  return {
    // active is an index
    isMac,
    tabs: getTabs(state),
    activeMarkers: state.ui.activityMarkers,
    borderColor: state.ui.borderColor,
    backgroundColor: state.ui.backgroundColor,
    maximized: state.ui.maximized,
    fullScreen: state.ui.fullScreen,
    showHamburgerMenu: state.ui.showHamburgerMenu,
    showWindowControls: state.ui.showWindowControls
  };
};

const mapDispatchToProps = (dispatch: webtermDispatch) => {
  return {
    onCloseTab: (i: string) => {
      dispatch(closeTab(i));
    },

    onChangeTab: (i: string) => {
      dispatch(changeTab(i));
    },

    maximize: () => {
      dispatch(maximize());
    },

    unmaximize: () => {
      dispatch(unmaximize());
    },

    openHamburgerMenu: (coordinates: {x: number; y: number}) => {
      dispatch(openHamburgerMenu(coordinates));
    },

    minimize: () => {
      dispatch(minimize());
    },

    close: () => {
      dispatch(close());
    }
  };
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps, null)(Header, 'Header');

export type HeaderConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
